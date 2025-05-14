import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Titulo } from '../components/Titulo';
import { AccNoAcc } from '../components/LoginReg/AccNoAcc';
import { LoginForm } from '../components/LoginReg/LoginForm';
import { AppStyles } from '../components/Shared/AppStyles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackHeader } from '../components/Headers/StackHeader';


type RootStackParamList = {
    login: { 
        viewFrom: string, //Vista desde la cual se accede a login
        stackHeader?: boolean 
    }; 
};

type LoginScreenRouteProp = RouteProp<RootStackParamList, "login">;

export const LoginScreen = () => {

    const route = useRoute<LoginScreenRouteProp>();
    const viewFrom = route.params?.viewFrom;
    const stackHeader = route.params?.stackHeader;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppStyles.backgroundColor }}>
            {stackHeader && <StackHeader/>}
            <Titulo title='Iniciar Sesión' />

            <LoginForm screenName={viewFrom ? viewFrom : 'home'} />

            <AccNoAcc goTo='registro' viewFrom={viewFrom} stackHeader={stackHeader}/>
            { viewFrom && 
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>Para acceder a esta vista, por favor inicie sesión o registrese</Text>    
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        marginTop: 20,
        paddingHorizontal: 15
    },
    messageText: {
        fontSize: 18,
        color: AppStyles.mainRedColor,
        textAlign: 'center',
        fontWeight: 'bold'
    },
})
