import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Person from '../@types/Person';

const useLogin = () => {
    const [user, setUser] = useState<Person | undefined>(undefined);

    useEffect(() => {
    // Recupera el usuario al inicar la app
    AsyncStorage.getItem('user').then(jsonValue => {
        if (jsonValue) {
            setUser(JSON.parse(jsonValue));
        }
    });
    }, []);

    const changeUser = async (userSetted:Person) => {
        setUser(userSetted);
        if (userSetted===undefined)
            await AsyncStorage.removeItem('user')
        else 
            await AsyncStorage.setItem('user', JSON.stringify(userSetted));
    };

    return { user, setUser: changeUser };
};

export default useLogin;
