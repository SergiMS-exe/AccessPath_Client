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
    }).then(response => response.data
        ).catch(error=>{
        console.error(error)
    });
    
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

type RegisterType = {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    tipoDiscapacidad: string;
    navigation: NativeStackNavigationProp<any, any>;
    screen: string;
    setUser: Function;
}

export async function register(params:RegisterType) {
    var usuario = await axios.post(API_HOST+'/register', 
    {
        nombre: params.nombre,
        apellidos: params.apellidos,
        email: params.email,
        password: params.password,
        tipoDiscapacidad: params.tipoDiscapacidad
    }).then(response => response.data.data.user
        ).catch(error=>{
        console.error(error)
    });   
    
    if (usuario !== undefined) {
        params.setUser(usuario);
        params.navigation.dispatch(
            CommonActions.reset({
                routes: [
                    {name: params.screen}
                ]
            })
        );
    }
}