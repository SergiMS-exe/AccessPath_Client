import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Titulo } from '../components/Titulo';

export const ProfileScreen = () => {
    return (
        <SafeAreaView>
            <Titulo title='Profile'/>
        </SafeAreaView>
    )
}