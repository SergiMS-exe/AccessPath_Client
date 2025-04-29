import React from 'react';
import { SafeAreaView } from 'react-native';
import { Titulo } from '../components/Titulo';
import { AccNoAcc } from '../components/LoginReg/AccNoAcc';
import { LoginForm } from '../components/LoginReg/LoginForm';
import { AppStyles } from '../components/Shared/AppStyles';


export const LoginScreen = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppStyles.backgroundColor }}>
            <Titulo title='Iniciar Sesión' />

            <LoginForm screenName='home' />

            <AccNoAcc goTo='registro' />
        </SafeAreaView>
    )
}
