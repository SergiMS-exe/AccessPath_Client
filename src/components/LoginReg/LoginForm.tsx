import React, { useContext, useRef } from 'react';
import { MyInput } from '../MyInput';
import { LoginContext } from '../Shared/Context';
import { useForm } from '../../hooks/useForm';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login } from '../../services/UserServices';
import { useNavigation } from '@react-navigation/native';
import MainButton from '../MainButton';

type Props = {
    screenName: string
}

type StackProps = NativeStackNavigationProp<any, any>;

export const LoginForm = ({ screenName }: Props) => {

    const navigation = useNavigation<StackProps>();

    const { email, password, onChange } = useForm({
        email: "",
        password: ""
    })

    const { setUser } = useContext(LoginContext);


    //Refs
    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);

    const handleKeyPress = (event: { key: string; }, nextField: { current: { focus: () => void; }; } | undefined) => {
        if (event.key === 'Tab') {
            nextField?.current.focus();
        } else if (event.key === 'Enter') {
            // Envía el formulario si el usuario presiona Enter
            login(email, password, navigation, screenName, setUser);
        }
    };

    const handleLogin = async () => {
        await login(email, password, navigation, screenName, setUser);
    }

    return (
        <>
            <MyInput
                title='Email'
                onChangeText={(text: string) => onChange(text, 'email')}
                ref={emailRef}
                onKeyPress={(event) => {
                    //console.log(event);
                    handleKeyPress(event, passwordRef)
                }} />

            <MyInput
                title='Contraseña'
                onChangeText={(text: string) => onChange(text, 'password')}
                ref={passwordRef}
                onKeyPress={(event) => handleKeyPress(event, emailRef)} />

            <View style={{ height: 30 }} />
            <MainButton title='Iniciar sesión' onPress={handleLogin} />
        </>
    )
}