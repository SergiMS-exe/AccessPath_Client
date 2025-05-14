import * as React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Titulo } from '../components/Titulo';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { AccNoAcc } from '../components/LoginReg/AccNoAcc';
import { RegisterForm } from '../components/LoginReg/RegisterForm';
import { AppStyles } from '../components/Shared/AppStyles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackHeader } from '../components/Headers/StackHeader';

type RootStackParamList = {
    register: { 
        viewFrom: string, //Vista desde la cual se accede a login
        stackHeader?: boolean 
    };
};

type RegisterScreenRouteProp = RouteProp<RootStackParamList, "register">;

interface Props extends NativeStackScreenProps<any, any> { };

export const RegistroScreen = ({ navigation }: Props) => {

    const route = useRoute<RegisterScreenRouteProp>();
    const viewFrom = route.params?.viewFrom;
    const stackHeader = route.params?.stackHeader;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppStyles.backgroundColor }}>
            <ScrollView automaticallyAdjustKeyboardInsets={true}
                contentContainerStyle={{ paddingBottom: 30 }}>
                {stackHeader && <StackHeader/>}
                <Titulo title='Registro' />

                <RegisterForm screenName={viewFrom ? viewFrom : 'home'} />

                <AccNoAcc goTo='login' viewFrom={viewFrom} stackHeader={stackHeader}/>
            </ScrollView>
        </SafeAreaView>
    )
}