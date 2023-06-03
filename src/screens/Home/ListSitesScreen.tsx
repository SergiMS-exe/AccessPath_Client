import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Titulo } from '../../components/Titulo';
import { FloatingButton } from '../../components/FloatingButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchCard } from '../../components/Card/SearchCard';

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
        <Titulo title='List'/>
        <View style={styles.container}>
            <SearchCard name='Casa paco' address='C/Independencia' rating={3.5}/>
        </View>
        <FloatingButton onPress={()=>navigation.navigate('Map')} text='Ver Mapa'/>
        </>
    )
}