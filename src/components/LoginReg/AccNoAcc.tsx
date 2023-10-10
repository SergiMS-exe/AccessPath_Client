import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    goTo: string
}

type DrawerProp = DrawerNavigationProp<any, any>;

export const AccNoAcc = ({ goTo }: Props) => {

    const navigation = useNavigation<DrawerProp>();

    const styles = StyleSheet.create({
        accNoAcc: {
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 10
        }
    })

    return (
        <View style={styles.accNoAcc}>{
            goTo === 'registro' ? (
                <>
                    <Text>¿No tienes cuenta?</Text>
                    <Text style={{ color: 'blue' }}
                        onPress={() => { navigation.navigate('Registro') }}>
                        Registrate
                    </Text>
                </>
            ) : (
                <>
                    <Text>¿Ya tienes una cuenta?</Text>
                    <Text style={{ color: 'blue' }} onPress={() => { navigation.navigate('Login') }}>
                        Inicia Sesion
                    </Text>
                </>
            )
        }
        </View>
    )
}