import React from 'react';
import { SafeAreaView } from 'react-native';
import { Titulo } from '../components/Titulo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Person from '../@types/Person';
import { AccNoAcc } from '../components/LoginReg/AccNoAcc';
import { LoginForm } from '../components/LoginReg/LoginForm';

interface Props extends NativeStackScreenProps<any, any>{};

export const LoginScreen = ({navigation}:Props) => {


    const user = new Person({_id:1, nombre:'a', apellidos: 'a', email: 'a', tipoDiscapacidad:'a'})
    return(
        <SafeAreaView>
            <Titulo title='Iniciar Sesion'/>

            <LoginForm navigation={navigation} screenName='home'/>


            <AccNoAcc navigation={navigation} goTo='registro'/>
            
        </SafeAreaView>
    )
}
