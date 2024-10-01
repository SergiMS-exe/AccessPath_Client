import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getPlacesByText } from '../services/PlacesServices';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackHeader } from '../components/Headers/StackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@rneui/themed';
import { Site } from '../../@types/Site';
import { ResultList } from '../components/Card/ResultList';
import { ListCard } from '../components/Card/ListCard';

interface Props extends NativeStackScreenProps<any, any> { };

export const SearchScreen = ({ route, navigation }: Props) => {
    const [places, setPlaces] = useState<Site[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState(route.params?.searchText || '');
    const [requestSent, setRequestSent] = useState(false);
    const [progress, setProgress] = useState(0);  // Estado para controlar el progreso

    const fetchPlaces = async (query: string) => {
        setRequestSent(true);
        setLoading(true);
        setProgress(0);  // Reiniciar el progreso cuando empieza una nueva búsqueda
        const response = await getPlacesByText(query);
        setPlaces(response.sites);
        setLoading(false);
    };

    useEffect(() => {
        if (loading && progress < 0.8) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => Math.min(prevProgress + 0.1, 0.8));
            }, 1200);

            return () => clearInterval(interval);
        }
    }, [loading, progress]);

    useEffect(() => {
        if (route.params?.searchText) {
            fetchPlaces(route.params.searchText);
        }
    }, [route.params?.searchText]);

    const handleSearchSubmit = () => {
        searchText.trim();
        fetchPlaces(searchText);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StackHeader title={"Búsqueda de sitios"} />

            <View style={styles.searchContainer}>
                <SearchBar
                    accessibilityValue={searchText ? { text: searchText } : { text: 'Busca un sitio para valorar...' }}
                    accessibilityRole='search'
                    accessible
                    accessibilityLabel='Buscador de sitios'
                    containerStyle={styles.searchBar}
                    inputContainerStyle={styles.searchBarInput}
                    inputStyle={{ color: '#727272' }}
                    placeholderTextColor={'#727272'}
                    round
                    lightTheme
                    showCancel
                    placeholder='Busca un sitio para valorar...'
                    value={searchText}
                    onSubmitEditing={handleSearchSubmit}
                    onChangeText={setSearchText}
                />
            </View>

            {requestSent && (
                <View style={styles.resultContainer}>
                    <ResultList
                        data={places}
                        noItemsMessage="No se encontraron resultados"
                        isLoading={loading}
                        progress={progress}
                        loadingText='Buscando sitios... Esto puede tardar unos segundos'
                        renderItemComponent={(item) => <ListCard site={item} />}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: '#f8f8f8',
    },
    searchBar: {
        backgroundColor: '#f8f8f8',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        height: 60,
    },
    searchBarInput: {
        height: 45,
        backgroundColor: '#e2e2e2',
        color: '#727272',
    },
    resultContainer: {
        flex: 1,
        paddingHorizontal: 10,
    }
});
