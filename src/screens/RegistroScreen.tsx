import * as React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Titulo } from '../components/Titulo';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { AccNoAcc } from '../components/LoginReg/AccNoAcc';
import { RegisterForm } from '../components/LoginReg/RegisterForm';


interface Props extends NativeStackScreenProps<any, any> { };

export const RegistroScreen = ({ navigation }: Props) => {

    return (
        <SafeAreaView>
            <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <Titulo containerStyle={{ marginTop: 20 }} title='Registro' />

                <RegisterForm screenName='home' />

                <AccNoAcc goTo='login' />
            </ScrollView>
        </SafeAreaView>
    )
}