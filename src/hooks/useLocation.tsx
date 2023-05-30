import { useState } from 'react';
import Geolocation, { GeolocationError } from '@react-native-community/geolocation';
import { LatLng } from 'react-native-leaflet-view';

const DEF_LOCATION : LatLng = {
    lat: 43.3603,
    lng: -5.84476
}

export const useLocation = ()=>{
    const [location, setLocation] = useState(DEF_LOCATION);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false)

    Geolocation.requestAuthorization(
        () => {
            Geolocation.getCurrentPosition(
            (position) => {
                if (!loaded) {
                    setLocation({lat: position.coords.latitude, lng: position.coords.longitude})
                    setLoaded(true);
                }
            },
            (error) => {
                // Ver código de error y mensaje
                console.log(error.code, error.message);
                setError("Error en la obtencion de la localizacion");
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        },
        () => {
            const errorMessage = "Error al cargar localización: Permiso denegado"
            console.error(errorMessage);
            setError(errorMessage)
        }
    )

    return {location, error};
}
