import axios from 'axios';
import {API_HOST } from '@env';

import { CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export async function login(email: string, password: string, navigation: NativeStackNavigationProp<any, any>, 
                            screen: string, setUser: Function) {
    
    var usuario = await axios.post(API_HOST+'/login', 
    {
        email: email,
        password: password
    }).then(response => response.data);
    console.log(usuario);
    
    if (usuario !== null) {
        setUser(usuario);
        navigation.dispatch(
            CommonActions.reset({
                routes: [
                    {name: screen}
                ]
            })
        );
    }
}