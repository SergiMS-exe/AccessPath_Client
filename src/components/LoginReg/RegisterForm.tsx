import React, { useContext, useState } from 'react';
import { Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { LoginContext } from '../Shared/Context';
import { useForm } from '../../hooks/useForm';
import { MyInput } from '../MyInput';
import { register } from '../../services/UserServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisabilitySelector from '../DisabilitySelector';
import { TypesOfDisabilitiesKey } from '../../../@types/Valoracion';
import { useNavigation } from '@react-navigation/native';


type Props = {
    screenName: string
}

type StackProps = NativeStackNavigationProp<any, any>;

export const RegisterForm = ({ screenName }: Props) => {

    const navigation = useNavigation<StackProps>();

    const { nombre, apellidos, email, password, repeatPassword, tipoDiscapacidad, onChange, valid } = useForm({
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        repeatPassword: "",
        tipoDiscapacidad: ""
    })

    const { setUser } = useContext(LoginContext);

    const handleRegister = async () => {
        await register({ nombre, apellidos, email, password, tipoDiscapacidad, navigation, screen: screenName, setUser });
        await AsyncStorage.setItem('savedSites', '[]')
    }

    const handleDisabilityChange = (newValue: TypesOfDisabilitiesKey) => {
        onChange(newValue, 'tipoDiscapacidad');
    };

    return (
        <>
            <MyInput title='Nombre' onChangeText={(text: string) => onChange(text, 'nombre')} />
            <MyInput title='Apellidos' onChangeText={(text: string) => onChange(text, 'apellidos')} />
            <MyInput title='Email' onChangeText={(text: string) => onChange(text, 'email')} />
            <DisabilitySelector
                value={tipoDiscapacidad as any}
                onChange={handleDisabilityChange}
            />
            <MyInput title='Contraseña' onChangeText={(text: string) => onChange(text, 'password')} />
            <MyInput title='Repita la Contraseña' onChangeText={(text: string) => onChange(text, 'repeatPassword')} />

            <Button title='Registrarse'
                onPress={handleRegister} />
        </>
    )

}