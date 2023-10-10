import * as React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Titulo } from '../components/Titulo';
import { MyInput } from '../components/MyInput';
import { SafeAreaView, Button, View, Text, StyleSheet } from 'react-native';
import { AccNoAcc } from '../components/LoginReg/AccNoAcc';
import { RegisterForm } from '../components/LoginReg/RegisterForm';
import DrawerHeader from '../components/Headers/DrawerHeader';


interface Props extends NativeStackScreenProps<any, any> { };

export const RegistroScreen = ({ navigation }: Props) => {

    const styles = StyleSheet.create({
        alreadyAccount: {
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 10
        }
    })

    return (
        <SafeAreaView>
            <Titulo containerStyle={{ marginTop: 20 }} title='Registro' />

            <RegisterForm screenName='home' />

            <AccNoAcc goTo='login' />
        </SafeAreaView>
    )
}