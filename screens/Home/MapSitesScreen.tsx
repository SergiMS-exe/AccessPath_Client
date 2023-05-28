import * as React from 'react';
import { Titulo } from '../../components/Titulo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FloatingButton } from '../../components/FloatingButton';

interface Props extends NativeStackScreenProps<any, any>{};

export const MapSitesScreen = ({navigation}: Props) => {
    return (
        <>
        <Titulo title='Map'/>
        <FloatingButton onPress={()=>navigation.navigate('List')}/>
        </>
    )
}