import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Titulo } from '../../components/Titulo';
import { FloatingButton } from '../../components/FloatingButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ListCard } from '../../components/Card/ListCard';
import { ResultList } from '../../components/Card/ResultList';
import { staticSites } from '../../services/PlacesServices';

interface Props extends NativeStackScreenProps<any, any>{};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export const ListSitesScreen = ({navigation}: Props) => {
    return (
        <>
        {/* <Titulo title='Sitios valorados cerca de ti'/> */}
        <ResultList data={staticSites}/>
        <FloatingButton onPress={()=>navigation.navigate('Map')} text='Ver Mapa'/>
        </>
    )
}