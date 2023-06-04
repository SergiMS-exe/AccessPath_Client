import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location } from "../../@types/Site";

const baseUrl ='https://maps.googleapis.com/maps/api/place'

export async function getPlacesByLocation(location: Location){

    const uri = baseUrl+'/nearbysearch/json';

    const response = await axios.get(uri, 
        {
            params: {
                location: location.latitude+'%'+location.longitude,
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
    candidates: Array<{
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
    }>;
  }
  

export async function getPlacesByText(text: string) {
    const rectangle = "rectangle:42.88254,-7.18317|43.66653,-4.51059";
    const uri = baseUrl+'/findplacefromtext/json';
    
    const response: PlaceResponse = await axios.get(uri, {
        params: {
            key: 'AIzaSyAv1vduVdGosz0qdPCs7hawR7ISgz97nbE',
            input: text,
            inputtype: 'textquery',
            locationbias: rectangle,
            fields: 'place_id,name,formatted_address,geometry,rating'
        }
    }).then(res => res.data)
    .catch((error)=>console.error(error));

    const candidates=response.candidates

    return candidates
}
