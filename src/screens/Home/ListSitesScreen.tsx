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
        <View style={{flex: 1}}>
            <ResultList 
                data={staticSites} 
                title='Sitios valorados cercanos' 
                noItemsMessage='No hay sitios valorados cerca de ti'
                isLoading={false}  // Asumiendo que staticSites siempre tiene datos y no hay una carga en curso
                renderItemComponent={(item) => <ListCard site={item} />}
            />
            <FloatingButton onPress={()=>navigation.navigate('Map')} text='Ver Mapa'/>
        </View>
    )
}
