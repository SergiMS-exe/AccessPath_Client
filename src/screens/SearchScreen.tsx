import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Titulo } from "../components/Titulo";
import { ListCard } from '../components/Card/ListCard';
import { getPlacesByText } from '../services/PlacesServices';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackHeader } from '../components/Headers/StackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Site } from '../../@types/Site';

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
        <SafeAreaView>
            <StackHeader/>
            <Titulo title='Search'/>
            <FlatList
                data={places}
                bounces              
                //key={(item) => item._id?.toString()}
                renderItem={({ item }) => <ListCard site={item} />}
            />
        </SafeAreaView>
    );
}
