import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Titulo } from '../../components/Titulo';
import { Map } from '../../components/Map';
import { FloatingButton } from '../../components/FloatingButton';

interface Props extends NativeStackScreenProps<any, any>{};

export const MapSitesScreen = ({navigation}: Props) => {
    return (
        <>
        {/* <Titulo title='Map'/> */}
        <Map/>
        <FloatingButton onPress={()=>navigation.navigate('List')} text="Ver Lista"/>
        </>
    )
}