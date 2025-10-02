import { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid, Linking } from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import Snackbar from 'react-native-snackbar';

type Location = {
  latitude: number;
  longitude: number;
};

const DEF_LOCATION: Location = { latitude: 43.3603, longitude: -5.84476 };

const getCurrentPosition = (options: any) =>
  new Promise<GeoPosition>((resolve, reject) =>
    Geolocation.getCurrentPosition(resolve, reject, options)
  );

export const useLocation = () => {
  const [location, setLocation] = useState<Location>(DEF_LOCATION);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  // Pedir permisos
  const requestPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permiso de ubicación',
            message: 'La app necesita acceder a tu ubicación',
            buttonNeutral: 'Preguntar luego',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Error solicitando permisos', err);
        return false;
      }
    }
  };

  // Obtener ubicación con high accuracy siempre
  const resetLocation = async () => {
    setLoaded(false);
    setError('');

    const hasPermission = await requestPermission();
    if (!hasPermission) {
      setError('Permiso de ubicación denegado');
      return;
    }

    try {
      const pos = await getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      });

      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      setLoaded(true);
      setError('');
    } catch (err: any) {
      console.warn('Error al obtener localización:', err);
      if (err?.code === 1) {
        setError('Permiso denegado. Abre ajustes para habilitarlo.');
        Snackbar.show({
          text: 'Permiso denegado. Abrir ajustes?',
          duration: Snackbar.LENGTH_LONG,
          action: { text: 'Abrir', onPress: () => Linking.openSettings() },
        });
      } else if (err?.code === 2) {
        setError('Proveedor de localización no disponible.');
      } else if (err?.code === 3) {
        setError('Tiempo de espera agotado al obtener la localización.');
      } else {
        setError('Error en la obtención de la localización');
      }
    }
  };

  useEffect(() => {
    resetLocation();
  }, []);

  useEffect(() => {
    if (error !== '') {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Reintentar',
          textColor: 'green',
          onPress: () => resetLocation(),
        },
      });
    }
  }, [error]);

  return { location, error, resetLocation, loaded };
};
