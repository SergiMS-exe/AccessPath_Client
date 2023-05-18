import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Titulo } from '../components/Titulo';

export const Home = () => {
    return (
        <SafeAreaView>
            <Titulo title='Home'/>
        </SafeAreaView>
    )
}