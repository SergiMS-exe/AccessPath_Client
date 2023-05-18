import * as React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Titulo } from '../components/Titulo';
import { MyInput } from '../components/MyInput';
import { SafeAreaView, Button, View, Text, StyleSheet } from 'react-native';


interface Props extends NativeStackScreenProps<any, any>{};

export const Registro = ({navigation}: Props) => {
    
    const styles = StyleSheet.create({
        alreadyAccount : {
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 10
        }
    })

    return(
        <SafeAreaView>
            <Titulo title='Registro'/>

            <MyInput title='Nombre'/> 
            <MyInput title='Apellidos'/> 
            <MyInput title='Email'/> 
            <MyInput title='Contraseña'/> 
            <MyInput title='Repita la contraseña'/> 

            <Button title='Registrarse' onPress={()=>{navigation.navigate("home")}}/>

            <View style={styles.alreadyAccount}>
                <Text>¿Ya tienes una cuenta?</Text>
                <Text style={{color: 'blue'}} onPress={()=>{navigation.navigate('login')}}>
                    Inicia Sesion
                </Text>
            </View>

        </SafeAreaView>
    )
}