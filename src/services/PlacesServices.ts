import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location, Site } from "../../@types/Site";
import Person from "../../@types/Person";
import { Platform } from "react-native";
import { LOCALHOST_ANDROID, LOCALHOST_IOS, REMOTE } from "@env";
import { CommentType } from "../../@types/CommentType";

const baseUrl = 'https://maps.googleapis.com/maps/api/place'
// const API_HOST = Platform.OS === 'ios' ? LOCALHOST_IOS : LOCALHOST_ANDROID;
const API_HOST = REMOTE;



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

export async function toggleSave(site: Site, user: Person, save: boolean) {
    const endpoint = save ? '/save' : '/unSave';

    const response = await axios.put(API_HOST + endpoint, {
        site: site,
        userEmail: user.email
    })
    console.log(response.data);
}

export async function getSavedSites(user: Person) {
    const response = await axios.get(API_HOST + '/userSaved', {
        params: {
            userId: user._id,
        }
    }).then(res => res.data)
    const sites: Site[] = response.data.sitios
    return sites
}
export async function sendComment(user: Person, site: Site, comment: string) {
    const response = await axios.post(API_HOST + '/comment', {
        userId: user._id,
        placeId: site.placeId,
        comment: comment
    }).then(res=>res.data)
    console.log(response);
    const nuevoComentario: CommentType = {
        '_id': response.data.comment._id,
        'texto': response.data.comment.texto,
        'usuario': {
            '_id': response.data.usuarioId,
            'nombre': user.nombre,
            'apellidos': user.apellidos
        }
    }
    return nuevoComentario
}

export async function editComment(placeId: string, commentId: string, newText: string) {
    const response = await axios.put(API_HOST + '/comment', {
        placeId: placeId,
        commentId: commentId,
        newText: newText
    }).then(res => res.data).catch(e=>console.error(e))
    console.log(response)

    
    return response.newComment; //Hay que transformar esto a CommentType (añadir nombre y apellidos)
}

export async function getComments(site: Site) {
    const response = await axios.get(API_HOST + '/comments', {
        params: {
            placeId: site.placeId
        }
    }).then(res => res.data)
    console.log(JSON.stringify(response));
    const comments: CommentType[] = response.data.comentarios

    return comments;
}

//Funciones auxiliares
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

const data = { "html_attributions": [], "results": [{ "business_status": "OPERATIONAL", "formatted_address": "C.C Azabache, N-630, Km. 451, 33420 Lugones, Asturias, España", "geometry": { "location": { "lat": 43.4135897, "lng": -5.7974924 }, "viewport": { "northeast": { "lat": 43.41494737989271, "lng": -5.796109470107278 }, "southwest": { "lat": 43.41224772010727, "lng": -5.798809129892722 } } }, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png", "icon_background_color": "#FF9E67", "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet", "name": "Restaurante KFC Restaurante KFC Restaurante KFC Restaurante KFC Restaurante KFC Restaurante KFC ", "opening_hours": { "open_now": false }, "photos": [{ "height": 713, "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/117172647763750422747\">MR KOALA</a>"], "photo_reference": "AZose0nqcR7v4HUo7lOdAkBtO2TrH0e0gBUja7hNgT14ei6qrXOh2jdLmZz92Wxlr2pNnIGXUVcQX0eEsE3nIFlaSfqgu19o_83JAecvD3bU9GXx4Y3sv_IOB0iE3ouIzbrIjlVDcQ-jLeh8c6xN0tcfB52cNZmczMpyjDEBq-Twlu7yrQZ-", "width": 1080 }], "place_id": "ChIJr0rnNOCLNg0R1JS0ZaOKsuw", "plus_code": { "compound_code": "C672+CX Lugones", "global_code": "8CMPC672+CX" }, "price_level": 1, "rating": 3.7, "reference": "ChIJr0rnNOCLNg0R1JS0ZaOKsuw", "types": ["meal_delivery", "meal_takeaway", "restaurant", "food", "point_of_interest", "establishment"], "user_ratings_total": 2188 }, { "business_status": "OPERATIONAL", "formatted_address": "CC Parque Principado, Autovía Ruta de la Plata, KM. 4,5, 33429 Paredes, Asturias, España", "geometry": { "location": { "lat": 43.3899323, "lng": -5.804538 }, "viewport": { "northeast": { "lat": 43.39137752989271, "lng": -5.803406370107278 }, "southwest": { "lat": 43.38867787010727, "lng": -5.806106029892722 } } }, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png", "icon_background_color": "#FF9E67", "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet", "name": "KFC Parque Principado", "opening_hours": { "open_now": false }, "photos": [{ "height": 720, "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/100660362750947213707\">A Google User</a>"], "photo_reference": "AZose0mEquT1M957l6YRwgxXVprSInuh4MGps9ls9rz_v27pBZt35rA9YZZbN2qMe1_i2OnGtFjpt17QarHsZL6TZ_CL5sdX4Hb5gIKBQa7Fpdd0J44pfqWPYwelYSaV8IdP-yhrWJveLasQHnKfqi5S6TuuxMb4-rhY2G4zIu-68IvuYaya", "width": 1080 }], "place_id": "ChIJvXtMEoSLNg0R2BAR0Wcnrxg", "plus_code": { "compound_code": "95QW+X5 Oviedo", "global_code": "8CMP95QW+X5" }, "price_level": 1, "rating": 4, "reference": "ChIJvXtMEoSLNg0R2BAR0Wcnrxg", "types": ["meal_delivery", "meal_takeaway", "restaurant", "food", "point_of_interest", "establishment"], "user_ratings_total": 282 }, { "business_status": "OPERATIONAL", "formatted_address": "Cl. Joaquín Costa, 33011 Oviedo, Asturias, España", "geometry": { "location": { "lat": 43.3706475, "lng": -5.830729799999999 }, "viewport": { "northeast": { "lat": 43.37179487989272, "lng": -5.829248170107277 }, "southwest": { "lat": 43.36909522010728, "lng": -5.831947829892721 } } }, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png", "icon_background_color": "#FF9E67", "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet", "name": "Restaurante KFC", "opening_hours": { "open_now": false }, "photos": [{ "height": 720, "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/105471981842670196099\">A Google User</a>"], "photo_reference": "AZose0kEoXZpXLwER9BPYsc2WNLprxd6XljZLUW--pOaXECHU5_d0R2LzEAUvsQ6Qn1kQ9c6ICLyOoR9BAho4DQwG-EGpfaNG2jJI1x8b14KLSMmN4uKqf95JAgSWF-gV8taFJWpqKTmpiD0trrib9k0ZdaZLMMROo6mxjX62-fxMw5zHPL_", "width": 720 }], "place_id": "ChIJTU4WWBqNNg0RkSVATKANSnw", "plus_code": { "compound_code": "95C9+7P Oviedo", "global_code": "8CMP95C9+7P" }, "price_level": 1, "rating": 3.8, "reference": "ChIJTU4WWBqNNg0RkSVATKANSnw", "types": ["meal_delivery", "meal_takeaway", "restaurant", "food", "point_of_interest", "establishment"], "user_ratings_total": 366 }, { "business_status": "OPERATIONAL", "formatted_address": "Calle Maestro Amado Morán, 33212 Gijón, Asturias, España", "geometry": { "location": { "lat": 43.53703549999999, "lng": -5.6947607 }, "viewport": { "northeast": { "lat": 43.53838802989272, "lng": -5.693392270107278 }, "southwest": { "lat": 43.53568837010727, "lng": -5.696091929892722 } } }, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png", "icon_background_color": "#FF9E67", "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet", "name": "Restaurante KFC", "opening_hours": { "open_now": false }, "photos": [{ "height": 839, "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/100907214904268486454\">A Google User</a>"], "photo_reference": "AZose0mCTxuIlMhsov0KsrYQIKZ4SxMJl1NVJnVYBw7MB05J3B42KXBeZrMBMIBeQLtPxWp4mb1WHhtC-gfs3m9bvYQbc0ry9lu0RCGbVM02daZyqUtSv2mtE7FCxJXTOrW3GJyJIXxxCttdqOAacNYiP-3hxlQKfuoI_WjV4J9YI6_dh8Z-", "width": 1870 }], "place_id": "ChIJaRaEgPV9Ng0RIEjwnL4hGr0", "plus_code": { "compound_code": "G8P4+R3 Gijón", "global_code": "8CMPG8P4+R3" }, "price_level": 1, "rating": 3.9, "reference": "ChIJaRaEgPV9Ng0RIEjwnL4hGr0", "types": ["meal_delivery", "meal_takeaway", "restaurant", "food", "point_of_interest", "establishment"], "user_ratings_total": 1662 }, { "business_status": "OPERATIONAL", "formatted_address": "Estadio El Molinón, Av. de El Molinón, 265, 33203 Gijón, Asturias, España", "geometry": { "location": { "lat": 43.536099, "lng": -5.636429499999999 }, "viewport": { "northeast": { "lat": 43.53748592989272, "lng": -5.635071070107279 }, "southwest": { "lat": 43.53478627010728, "lng": -5.637770729892723 } } }, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png", "icon_background_color": "#FF9E67", "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet", "name": "Restaurante KFC", "opening_hours": { "open_now": false }, "photos": [{ "height": 720, "html_attributions": ["<a href=\"https://maps.google.com/maps/contrib/115008210557403124314\">A Google User</a>"], "photo_reference": "AZose0m-uZvB4As3j4lDRuR3-HQw1VQ3nrqOmBMmzVtebuinvizij-lDRKnZBtmQ1A5ZIOTcJLEIxqjxTs3i3WaDx337TnGeeymfafM1vyTf3lgVEJhLY_6AEkJv79ytmh2OgM4w19uz-OQfHOGpkQ4xooWIuVGac5gb9ajFXewkehJb1wyv", "width": 720 }], "place_id": "ChIJ5V_OvjF7Ng0RVzkuN83-TVk", "plus_code": { "compound_code": "G9P7+CC Gijón", "global_code": "8CMPG9P7+CC" }, "price_level": 1, "rating": 4.3, "reference": "ChIJ5V_OvjF7Ng0RVzkuN83-TVk", "types": ["meal_delivery", "meal_takeaway", "restaurant", "food", "point_of_interest", "establishment"], "user_ratings_total": 1018 }], "status": "OK" }

const convertDataToSites = (data: any): Site[] => {
    return data.results.map((result: any) => {
        const { name, formatted_address, rating, types, geometry, place_id } = result;
        const { lat, lng } = geometry.location;
        const location = { latitude: lat, longitude: lng };
        return new Site(name, formatted_address, rating, types, location, place_id);
    });
};

export const staticSites: Site[] = convertDataToSites(data);

