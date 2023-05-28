import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Titulo } from '../../components/Titulo';
import { FloatingButton } from '../../components/FloatingButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any>{};

export const ListSitesScreen = ({navigation}: Props) => {
    return (
        <>
        <Titulo title='List'/>
        <FloatingButton onPress={()=>navigation.navigate('Map')}/>
        </>
    )
}