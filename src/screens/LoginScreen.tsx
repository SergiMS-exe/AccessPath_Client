import React from 'react';
import { SafeAreaView } from 'react-native';
import { Titulo } from '../components/Titulo';
import { AccNoAcc } from '../components/LoginReg/AccNoAcc';
import { LoginForm } from '../components/LoginReg/LoginForm';


export const LoginScreen = () => {

    return (
        <SafeAreaView>
            <Titulo title='Iniciar Sesión' />

            <LoginForm screenName='home' />

            <AccNoAcc goTo='registro' />
        </SafeAreaView>
    )
}
