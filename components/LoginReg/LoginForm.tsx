import React, {useContext} from 'react';
import { MyInput } from '../MyInput';
import { LoginContext } from '../Shared/Context';
import { useForm } from '../../hooks/useForm';
import { Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login } from '../../services/UserServices';

type Props = {
    navigation : NativeStackNavigationProp<any, any>;
    screenName : string
}

export const LoginForm = ({screenName, navigation} : Props) => {

    const { email, password, onChange, valid } = useForm({
        email: "",
        password: ""
    })

    const { setUser } = useContext(LoginContext);

    return (
        <>
            <MyInput title='Email' onChangeText={(text: string) => onChange(text, 'email')}/>
            <MyInput title='Password' onChangeText={(text: string) => onChange(text, 'password')}/>

            
            <Button title='Iniciar Sesion' 
                onPress={async ()=>{
                    await login(email, password, navigation, screenName, setUser)
                    }}/>
        </>
    )
}