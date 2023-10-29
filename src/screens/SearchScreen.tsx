import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { getPlacesByText } from '../services/PlacesServices';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackHeader } from '../components/Headers/StackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Site } from '../../@types/Site';
import { ResultList } from '../components/Card/ResultList';
import { ListCard } from '../components/Card/ListCard';

interface Props extends NativeStackScreenProps<any, any> { };

export const SearchScreen = ({ route }: Props) => {
    const [places, setPlaces] = useState<Site[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            const response = await getPlacesByText(route.params?.searchText);
            setPlaces(response.sites);
            setLoading(false);
        };

        fetchPlaces();

    }, [route.params?.searchText]);

    return (
        <SafeAreaView style={styles.container}>
            <StackHeader title={"Búsqueda: '" + route.params?.searchText + "'"} />

            <ResultList
                data={places}
                noItemsMessage="No se encontraron resultados"
                isLoading={loading}
                renderItemComponent={(item) => <ListCard site={item} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});
