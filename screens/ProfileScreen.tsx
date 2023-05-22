import React, {useContext} from 'react';
import { Button, SafeAreaView } from 'react-native';
import { Titulo } from '../components/Titulo';
import { LoginContext } from '../components/Shared/Context';

export const ProfileScreen = () => {

    const { setUser} = useContext(LoginContext)

    return (
        <SafeAreaView>
            <Titulo title='Profile'/>
            <Button title='Cerrar Sesión' onPress={() => {setUser(undefined)}}/>
        </SafeAreaView>
    )
}