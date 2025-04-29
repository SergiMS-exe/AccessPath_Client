import * as React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Titulo } from '../components/Titulo';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { AccNoAcc } from '../components/LoginReg/AccNoAcc';
import { RegisterForm } from '../components/LoginReg/RegisterForm';
import { AppStyles } from '../components/Shared/AppStyles';


interface Props extends NativeStackScreenProps<any, any> { };

export const RegistroScreen = ({ navigation }: Props) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppStyles.backgroundColor }}>
            <ScrollView automaticallyAdjustKeyboardInsets={true}
                contentContainerStyle={{ paddingBottom: 30 }}>
                <Titulo title='Registro' />

                <RegisterForm screenName='home' />

                <AccNoAcc goTo='login' />
            </ScrollView>
        </SafeAreaView>
    )
}