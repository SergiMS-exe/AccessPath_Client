import React, { useContext } from 'react';
import { Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { LoginContext } from '../Shared/Context';
import { useForm } from '../../hooks/useForm';
import { MyInput } from '../MyInput';
import { register } from '../../services/UserServices';


type Props = {
    navigation : NativeStackNavigationProp<any, any>;
    screenName : string
}

export const RegisterForm = ({screenName, navigation}: Props) => {

    const { nombre, apellidos, email, password, repeatPassword, tipoDiscapacidad, onChange, valid } = useForm({
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        repeatPassword: "",
        tipoDiscapacidad: ""
    })

    const { setUser } = useContext(LoginContext);

    return (
        <>
            <MyInput title='Nombre' onChangeText={(text: string) => onChange(text, 'nombre')}/>
            <MyInput title='Apellidos' onChangeText={(text: string) => onChange(text, 'apellidos')}/>
            <MyInput title='Email' onChangeText={(text: string) => onChange(text, 'email')}/>
            <MyInput title='Contraseña' onChangeText={(text: string) => onChange(text, 'password')}/>
            <MyInput title='Repita la Contraseña' onChangeText={(text: string) => onChange(text, 'repeatPassword')}/>
            <MyInput title='Tipos de discapacidad' onChangeText={(text: string) => onChange(text, 'tipoDiscapacidad')}/>
            
            <Button title='Registrarse' 
                onPress={async () => await register({nombre, apellidos, email, password, tipoDiscapacidad, navigation, screen: screenName, setUser})}/>
        </>
    )

}