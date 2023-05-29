import { NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    navigation : NativeStackNavigationProp<any, any>;
    goTo: string
}

export const AccNoAcc = ({navigation, goTo}: Props) => {

    const styles = StyleSheet.create({
        accNoAcc: {
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 10
        }
    })

    return(
        <View style={styles.accNoAcc}>{
            goTo === 'registro' ? (
                <>
                    <Text>¿No tienes cuenta?</Text>
                    <Text style={{color: 'blue'}} 
                        onPress={()=>{navigation.navigate('register')}}>
                        Registrate
                    </Text>
                </>
            ) : (
                <>
                    <Text>¿Ya tienes una cuenta?</Text>
                    <Text style={{color: 'blue'}} onPress={()=>{navigation.navigate('login')}}>
                        Inicia Sesion
                    </Text>
                </>
            )
        }
        </View>
    )
}