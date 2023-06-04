import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Titulo } from '../../components/Titulo';
import { FloatingButton } from '../../components/FloatingButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ListCard } from '../../components/Card/ListCard';

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
        <Titulo title='Sitios valorados cerca de ti'/>
        <View style={styles.container}>
            <ListCard site={{nombre:'Casa paco', direccion: 'C/Independencia', calificacion:3.4}}/>
        </View>
        <FloatingButton onPress={()=>navigation.navigate('Map')} text='Ver Mapa'/>
        </>
    )
}