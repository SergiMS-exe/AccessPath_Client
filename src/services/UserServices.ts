import axios from 'axios';

import { CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { LOCALHOST_ANDROID, LOCALHOST_IOS, REMOTE } from '@env'
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Person from '../../@types/Person';
import { Site } from '../../@types/Site';
import { removePhotosFromSite } from './PlacesServices';
import { Valoracion } from '../../@types/Valoracion';

const baseUrlUsers = '/users'

// const API_HOST = 'http://192.168.0.7:3002' + baseUrlUsers;
const API_HOST = REMOTE + baseUrlUsers;

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
            console.log("login de usuario: " + JSON.stringify(usuario))
            setUser(usuario);
            const savedSites = await getSavedSites(usuario);
            await AsyncStorage.setItem("savedSites", JSON.stringify(savedSites));
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

export async function deleteAccount(userId: string) {
    const peticion = await axios.delete(API_HOST + '/' + userId).then(
        () => {
            return { success: true, message: 'Cuenta eliminada correctamente.' };
        }
    ).catch(error => {
        console.error(error)
        return { success: false, message: 'No se pudo eliminar la cuenta.' };
    });

    return peticion;
}

export async function updateAccount(person: Person) {
    const peticion = await axios.put(API_HOST + '/' + person._id, {
        person: person
    }).then(() => {
        return { success: true, message: 'Datos actualizados correctamente.' };
    }).catch(error => {
        console.error(error);
        return { success: false, message: "No se pudo actualizar el usuario" };
    });

    return peticion;
}

export async function updateUserPassword(userId: string, oldPassword: string, newPassword: string) {
    return axios.put(API_HOST + '/password/' + userId, {
        oldPassword: oldPassword,
        newPassword: newPassword
    }).then(() => {
        return { success: true, message: 'Contraseña actualizada correctamente.' };
    }).catch(error => {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data };
        } else {
            console.error(error);
            throw error;
        }
    });
}



export async function toggleSave(site: Site, user: Person, save: boolean) {
    let response;

    if (save) {
        //Quitar fotos de sitio
        const siteToSend = removePhotosFromSite(site);

        response = await axios.put(API_HOST + '/saveSite', {
            site: siteToSend,
            userId: user._id
        })
    } else {
        response = await axios.put(API_HOST + '/unsaveSite', {
            placeId: site.placeId,
            userId: user._id
        })
    }

    console.log(response.data);
}

export async function getSavedSites(user: Person) {
    const response = await axios.get(API_HOST + '/savedSites/' + user._id).
        then(res => res.data);
    const sites: Site[] = response.sites;
    return sites;
}

export async function getUserComments(user: Person) {
    const response = await axios.get(API_HOST + '/comments/' + user._id).
        then(res => res.data);
    const comments: Site[] = response.sites;
    return comments
}

export async function getUserRatings(user: Person) {
    const response = await axios.get(API_HOST + '/ratings/' + user._id).
        then(res => {
            const sitesWRatings: { valoracion: Valoracion, site: Site }[] = res.data.sitesWRating;
            return { success: true, sitesWRatings: sitesWRatings };
        }).catch(error => {
            console.error(error);
            return { success: false, sitesWRatings: [], message: "No se pudieron obtener las valoraciones del usuario" };
        });

    return response;
}

export async function getUserPhotos(user: Person) {
    const response = await axios.get(API_HOST + '/photos/' + user._id).
        then(res => {
            const sites: Site[] = res.data.sites;
            return { success: true, sites };
        }).catch(error => {
            console.error(error);
            return { success: false, sites: [], message: "No se pudieron obtener las fotos del usuario" };
        });

    return response;
}