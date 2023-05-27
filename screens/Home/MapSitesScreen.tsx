import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Titulo } from '../../components/Titulo';
import { Map } from '../../components/Map';

export function MapSitesScreen() {
    return (
        <>
        <Titulo title='Map'/>
        <Map/>
        </>
    )
}