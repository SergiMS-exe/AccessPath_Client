import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


type Location = {
    latitude: number;
    longitude: number;
}

export async function getPlacesByLocation(location: Location){

    const uri = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

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