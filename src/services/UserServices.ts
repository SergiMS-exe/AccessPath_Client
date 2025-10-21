import axios from 'axios';

import { CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { LOCALHOST_ANDROID, LOCALHOST_IOS, REMOTE } from '@env'
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Person from '../../@types/Person';
import { Site } from '../../@types/Site';
import { removePhotosFromSite } from './PlacesServices';
import { emptyPaginationInfo } from '../../@types/Pagination';
import Snackbar from 'react-native-snackbar';
import { AppStyles } from '../components/Shared/AppStyles';

const baseUrlUsers = '/users'

// const API_HOST = 'http://10.0.2.2:3001' + baseUrlUsers;
const API_HOST = REMOTE + baseUrlUsers;

export async function login(email: string, password: string, navigation: NativeStackNavigationProp<any, any>,
    screen: string, setUser: Function) {

    const peticion = await axios.post(API_HOST + '/login',
        {
            email: email,
            password: password
        }).then(response => response.data
        ).catch(error => {
            if (error.status === 404) {
                Snackbar.show({
                    text: "El usuario o la contraseña no son correctos",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: AppStyles.mainRedColor,
                    textColor: AppStyles.white
                })
            }
            else console.error(error)
        });

    if (peticion !== undefined) {
        const usuario: Person = peticion.user

        if (usuario !== null) {
            console.log("login de usuario: " + JSON.stringify(usuario))
            setUser(usuario);
            // const savedSites = await getSavedSites(usuario);
            // await AsyncStorage.setItem("savedSites", JSON.stringify(savedSites));
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
    confirmPassword: string;
    tipoDiscapacidad: string;
    navigation: NativeStackNavigationProp<any, any>;
    screen: string;
    setUser: Function;
}

export async function register(params: RegisterType) {
    let success = false;
    let message = "";
    const peticion = await axios.post(API_HOST + '/register',
        {
            nombre: params.nombre,
            apellidos: params.apellidos,
            email: params.email,
            password: params.password,
            confirmPassword: params.confirmPassword,
            tipoDiscapacidad: params.tipoDiscapacidad
        }).then(response => {
            return { success: true, message: response.data.msg, user: response.data.user };
        }
        ).catch(error => {
            //console.error(error)
            return { success: false, message: error.response.data.msg, user: undefined };
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

    return { success: peticion.success, message: peticion.message };
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
        return { success: false, message: error.response.data.msg };
    });

    return peticion;
}

export async function updateUserPassword(userId: string, oldPassword: string, newPassword: string, confirmPassword: string) {
    return axios.put(API_HOST + '/password/' + userId, {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmPassword
    }).then(() => {
        return { success: true, message: 'Contraseña actualizada correctamente.' };
    }).catch(error => {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.msg };
        } else {
            return { success: false, message: error.response.data.msg };
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

export async function getSavedSites(user: Person, page: number = 1, limit: number = 10) {
    try {
        const response = await axios.get(
            `${API_HOST}/savedSites/${user._id}?page=${page}&limit=${limit}`
        );

        return {
            success: true,
            sites: response.data.data, // sitios de la página actual
            pagination: response.data.pagination,
            message: response.data.msg
        };
    } catch (error: any) {
        return {
            success: false,
            sites: [],
            pagination: emptyPaginationInfo(limit),
            error: error.message
        };
    }
}

export async function getUserComments(user: Person, page: number = 1, limit: number = 10) {
    try {
        const response = await axios.get(
            `${API_HOST}/comments/${user._id}?page=${page}&limit=${limit}`
        );

        return {
            success: true,
            sites: response.data.data,
            pagination: response.data.pagination,
            message: response.data.msg
        };
    } catch (error: any) {
        return {
            success: false,
            sites: [],
            pagination: emptyPaginationInfo(limit),
            error: error.message
        };
    }
}

export async function getUserRatings(user: Person, page: number = 1, limit: number = 10) {
    try {
        const response = await axios.get(
            `${API_HOST}/ratings/${user._id}?page=${page}&limit=${limit}`
        );

        return {
            success: true,
            sitesWRatings: response.data.data,
            pagination: response.data.pagination,
            message: response.data.msg
        };
    } catch (error: any) {
        return {
            success: false,
            sitesWRatings: [],
            pagination: emptyPaginationInfo(limit),
            error: error.message
        };
    }
}

export async function getUserPhotos(user: Person, page: number = 1, limit: number = 10) {
    try {
        const response = await axios.get(
            `${API_HOST}/photos/${user._id}?page=${page}&limit=${limit}`
        );

        return {
            success: true,
            sites: response.data.data,
            pagination: response.data.pagination,
            message: response.data.msg
        };
    } catch (error: any) {
        return {
            success: false,
            sites: [],
            pagination: emptyPaginationInfo(limit),
            error: error.message
        };
    }
}


