import React, { useContext } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { LoginContext } from '../Shared/Context';
import { useForm } from '../../hooks/useForm';
import { MyInput } from '../MyInput';
import { register } from '../../services/UserServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisabilitySelector from '../DisabilitySelector';
import { TypesOfDisabilities, TypesOfDisabilitiesKey, TypesOfDisabilitiesValue } from '../../../@types/Valoracion';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import MainButton from '../MainButton';


type Props = {
    screenName: string
}

type StackProps = NativeStackNavigationProp<any, any>;

export const RegisterForm = ({ screenName }: Props) => {

    const navigation = useNavigation<StackProps>();

    const { nombre, apellidos, email, password, confirmPassword, tipoDiscapacidad, onChange, valid } = useForm({
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        confirmPassword: "",
        tipoDiscapacidad: TypesOfDisabilities.ninguna,
    })

    const { setUser } = useContext(LoginContext);

    const handleRegister = async () => {
        const response = await register({ nombre, apellidos, email, password, confirmPassword, tipoDiscapacidad, navigation, screen: screenName, setUser });
        if (!response.success) {
            Snackbar.show({
                text: response.message,
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
                textColor: '#ffffff'
            });
        }
        await AsyncStorage.setItem('savedSites', '[]')
    }

    const handleDisabilityChange = (newValue: TypesOfDisabilitiesValue) => {
        onChange(newValue, 'tipoDiscapacidad');
    };

    return (
        <>
            <MyInput title='Nombre' onChangeText={(text: string) => onChange(text, 'nombre')} />
            <MyInput title='Apellidos' onChangeText={(text: string) => onChange(text, 'apellidos')} />
            <MyInput title='Email' onChangeText={(text: string) => onChange(text, 'email')} />
            <DisabilitySelector
                value={tipoDiscapacidad}
                onChange={handleDisabilityChange}
            />
            <MyInput title='Contraseña' onChangeText={(text: string) => onChange(text, 'password')} />
            <MyInput title='Repita la Contraseña' onChangeText={(text: string) => onChange(text, 'confirmPassword')} />

            <MainButton title='Registrarse'
                onPress={handleRegister} />
        </>
    )

}