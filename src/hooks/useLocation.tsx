import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

type Location = {
    latitude: number;
    longitude: number;
};

const DEF_LOCATION: Location = {
    latitude: 43.3603,
    longitude: -5.84476
};

export const useLocation = () => {
    const [location, setLocation] = useState<Location>(DEF_LOCATION);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);

    const resetLocation = () => {
        Geolocation.requestAuthorization(
            () => {
                Geolocation.getCurrentPosition(
                    (position) => {
                        if (!loaded) {
                            setLocation({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            });
                            setLoaded(true);
                        }
                    },
                    (error) => {
                        console.error(error.code, error.message);
                        setError("Error en la obtención de la localización");
                    },
                    { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
                );
            },
            () => {
                const errorMessage = "Error al cargar localización: Permiso denegado";
                console.error(errorMessage);
                setError(errorMessage);
            }
        );
    }

    useEffect(() => {
        resetLocation();
    }, []);

    return { location, error, resetLocation };
}
