import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location, Site } from "../../@types/Site";

const baseUrl = 'https://maps.googleapis.com/maps/api/place'

export async function getPlacesByLocation(location: Location) {

    const uri = baseUrl + '/nearbysearch/json';

    const response = await axios.get(uri,
        {
            params: {
                location: location.latitude + '%' + location.longitude,
                radius: 1500,
                key: 'AIzaSyAv1vduVdGosz0qdPCs7hawR7ISgz97nbE'
            }
        }
    );

    await AsyncStorage.setItem('placesCache', JSON.stringify(response.data))
}

export async function checkIfClickedMarker(location: Location) {
    const placesCache = await AsyncStorage.getItem('placesCache')

    if (placesCache) {
        const parsedPlaces = JSON.parse(placesCache);

        console.log(parsedPlaces);

    }
}

interface PlaceResponse {
    results: Array<{
        place_id: string;
        name: string;
        formatted_address: string;
        rating: number;
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
        };
        types: string[];
    }>;
}


export async function getPlacesByText(text: string) {

    const centro: Location = {
        latitude: 43.34918,
        longitude: -5.61103
    }

    const occidente: Location = {
        latitude: 43.31083,
        longitude: -6.57842
    }

    const oriente: Location = {
        latitude: 43.38709,
        longitude: -4.88617
    }

    var response = await makeRequest(text, centro);
    console.log(JSON.stringify(response));
    if (response.results.length == 0)
        response = await makeRequest(text, occidente);
    if (response.results.length == 0)
        response = await makeRequest(text, oriente, 30000);

    
    return convertToSite(response)
}

async function makeRequest(query: string, location: Location, radius?: number) {

    const rectangle = "rectangle:42.88254,-7.18317|43.66653,-4.51059";
    const uri = baseUrl + '/textsearch/json';

    const response: PlaceResponse = await axios.get(uri, {
        params: {
            key: 'AIzaSyAv1vduVdGosz0qdPCs7hawR7ISgz97nbE',
            query: query,
            radius: radius || 50000,
            location: location.latitude + '%' + location.longitude,
            language: 'es',
            //fields: 'place_id,name,formatted_address,geometry,rating,types'
        }
    }).then(res => res.data)
        .catch((error) => console.error(error));

    return (response)
}

function convertToSite(placeResponse: PlaceResponse): Site[] {
    return placeResponse.results.map(result => {
        const { place_id, name, formatted_address, geometry, types, rating } = result;
        const { lat, lng } = geometry.location;

        const location: Location = {
            latitude: lat,
            longitude: lng
        };

        return new Site(name, formatted_address, rating, types, location, place_id);
    });
}
