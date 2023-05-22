import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Person from '../@types/Person';

const useAuth = () => {
  const [user, setUser] = useState<Person | undefined>(undefined);

  useEffect(() => {
    // Recupera el usuario de AsyncStorage al cargar la aplicación
    AsyncStorage.getItem('user').then(jsonValue => {
      if (jsonValue) {
        setUser(JSON.parse(jsonValue));
      }
    });
  }, []);

  const setUserAndStore = async (newUser:Person) => {
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  return { user, setUser: setUserAndStore };
};

export default useAuth;
