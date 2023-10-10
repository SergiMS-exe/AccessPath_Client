import React from 'react';
import { SafeAreaView } from 'react-native';
import { Titulo } from '../components/Titulo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Person from '../../@types/Person';
import { AccNoAcc } from '../components/LoginReg/AccNoAcc';
import { LoginForm } from '../components/LoginReg/LoginForm';


export const LoginScreen = () => {

    //const user = new Person({_id:1, nombre:'a', apellidos: 'a', email: 'a', tipoDiscapacidad:'a'})
    return (
        <SafeAreaView>
            <Titulo containerStyle={{ marginTop: 20 }} title='Iniciar Sesion' />

            <LoginForm screenName='home' />

            <AccNoAcc goTo='registro' />
        </SafeAreaView>
    )
}
