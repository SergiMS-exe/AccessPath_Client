import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getPlacesByText } from '../services/PlacesServices';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackHeader } from '../components/Headers/StackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Site } from '../../@types/Site';
import { ResultList } from '../components/Card/ResultList';

interface Props extends NativeStackScreenProps<any, any>{};

export const SearchScreen = ({route}: Props) => {
    const [places, setPlaces] = useState<Site[]>([]);
    
    useEffect(() => {
        const fetchPlaces = async () => {
            const response = await getPlacesByText(route.params?.searchText); // Cambia "Asturias" por el texto que desees buscar
            setPlaces(response); // Asegúrate de que esta es la forma correcta de acceder a los datos de los lugares en la respuesta
            
        }
        fetchPlaces();
    }, []);

    return(
        <SafeAreaView style={{flex: 1}}> 
            <StackHeader title={"Búsqueda: '"+route.params?.searchText+"'"}/>
            <ResultList data={places} noItemsMessage='No se han encontrado '/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    list : {
        paddingHorizontal: 10
    }
})