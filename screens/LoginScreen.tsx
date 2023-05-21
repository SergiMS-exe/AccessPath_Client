import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import { MyInput } from '../components/MyInput';
import { Titulo } from '../components/Titulo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any>{};

export const LoginScreen = ({navigation}:Props) => {

    const styles = StyleSheet.create({
        noAccount : {
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 10
        }
    })

    return(
        <SafeAreaView>
            <Titulo title='Iniciar Sesion'/>
            
            <MyInput title='Email'/>
            <MyInput title='Contraseña'/>

            <Button title='Iniciar Sesion' onPress={()=>{navigation.navigate("home")}}/>

            <View style={styles.noAccount}>
                <Text>¿No tienes cuenta?</Text>
                <Text style={{color: 'blue'}} onPress={()=>{navigation.navigate('register')}}>
                    Registrate
                </Text>
            </View>
        </SafeAreaView>
    )
}
