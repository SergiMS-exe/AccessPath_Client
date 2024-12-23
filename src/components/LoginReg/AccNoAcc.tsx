import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyles } from '../Shared/AppStyles';

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
        },
        text: {
            fontSize: 16,
            fontWeight: '500'
        },
        coloredText: {
            fontSize: 16,
            fontWeight: '500',
            color: AppStyles.mainBlueColor
        }
    })

    return (
        <View style={styles.accNoAcc}>{
            goTo === 'registro' ? (
                <>
                    <Text style={styles.text}>¿No tienes cuenta?</Text>
                    <Text style={styles.coloredText}
                        onPress={() => { navigation.navigate('Registro') }}>
                        Registrate
                    </Text>
                </>
            ) : (
                <>
                    <Text style={styles.text}>¿Ya tienes una cuenta?</Text>
                    <Text style={styles.coloredText} onPress={() => { navigation.navigate('Login') }}>
                        Inicia Sesion
                    </Text>
                </>
            )
        }
        </View>
    )
}