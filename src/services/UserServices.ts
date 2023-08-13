import axios from 'axios';

import { CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { LOCALHOST_ANDROID, LOCALHOST_IOS, REMOTE } from '@env'
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Person from '../../@types/Person';
import { Site } from '../../@types/Site';

const baseUrlUsers = '/users'

const API_HOST = (Platform.OS === 'ios' ? LOCALHOST_IOS : LOCALHOST_ANDROID) + baseUrlUsers;
//const API_HOST = REMOTE + baseUrlUsers;

export async function login(email: string, password: string, navigation: NativeStackNavigationProp<any, any>,
    screen: string, setUser: Function) {

    const peticion = await axios.post(API_HOST + '/login',
        {
            email: email,
            password: password
        }).then(response => response.data
        ).catch(error => {
            console.error(error)
        });

    if (peticion !== undefined) {
        const usuario = peticion.user

        if (usuario !== null) {
            console.log(usuario)
            setUser(usuario);
            navigation.dispatch(
                CommonActions.reset({
                    routes: [
                        { name: screen }
                    ]
                })
            );
        }
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

export async function register(params: RegisterType) {
    const peticion = await axios.post(API_HOST + '/register',
        {
            nombre: params.nombre,
            apellidos: params.apellidos,
            email: params.email,
            password: params.password,
            tipoDiscapacidad: params.tipoDiscapacidad
        }).then(response => response.data
        ).catch(error => {
            console.error(error)
        });

    const usuario = peticion.user

    if (usuario !== undefined) {
        params.setUser(usuario);
        params.navigation.dispatch(
            CommonActions.reset({
                routes: [
                    { name: params.screen }
                ]
            })
        );
    }
}

export async function logout(setUser: Function) {
    setUser(undefined);
    await AsyncStorage.removeItem("savedSites");
}

export async function deleteAccount(userId: string, setUser: Function) {
    const peticion = await axios.delete(API_HOST, {
        params: {
            userId: userId
        }
    }).then(
        response => response.data
    ).catch(error => {
        console.error(error)
    });

    const usuario = peticion.user

    if (usuario !== undefined) {
        setUser(usuario);
    } else {
        await logout(setUser);
    }
}

export async function toggleSave(site: Site, user: Person, save: boolean) {
    const endpoint = save ? '/saveSite' : '/unsaveSite';

    const response = await axios.put(API_HOST + endpoint, {
        site: site,
        userId: user._id
    })
    console.log(response.data);
}

export async function getSavedSites(user: Person) {
    const response = await axios.get(API_HOST + '/savedSites', {
        params: {
            userId: user._id,
        }
    }).then(res => res.data)
    const sites: Site[] = response.sitios
    return sites
}