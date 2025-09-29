import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importar AsyncStorage
import { getPlacesByText } from '../services/PlacesServices';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackHeader } from '../components/Headers/StackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@rneui/themed';
import { Site } from '../../@types/Site';
import { ResultList } from '../components/Card/ResultList';
import { ListCard } from '../components/Card/ListCard';
import { AppStyles } from '../components/Shared/AppStyles';
import App from '../../App';
import { SearchBarDefault } from '@rneui/base/dist/SearchBar/SearchBar-default';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from '@rneui/base';

interface Props extends NativeStackScreenProps<any, any> { };

const MAX_HISTORY_LENGTH = 10;  // Máximo de búsquedas en el historial

export const SearchScreen = ({ route, navigation }: Props) => {
    const [places, setPlaces] = useState<Site[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState(route.params?.searchText || '');
    const [requestSent, setRequestSent] = useState(false);
    const [progress, setProgress] = useState(0);  // Progreso de la barra
    const [searchHistory, setSearchHistory] = useState<any[]>([]);  // Historial de búsquedas
    
    // Cargar historial al montar el componente
    useEffect(() => {
        loadSearchHistory();
    }, []);
    
    // Función para cargar el historial del almacenamiento local
    const loadSearchHistory = async () => {
        try {
            const storedHistory = await AsyncStorage.getItem('searchHistory');
            if (storedHistory !== null) {
                setSearchHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error("Error al cargar el historial de búsquedas", error);
        }
    };
    
    // Función para guardar una nueva búsqueda en el historial
    const addSearchToHistory = async (query: string, results: Site[]) => {
        try {
            const trimmedQuery = query.trim();  // Trimear y convertir a minúsculas
            const newSearchEntry = { query: trimmedQuery, results };
            
            // Filtrar el historial para eliminar cualquier entrada con la misma búsqueda (case-insensitive)
            let updatedHistory = searchHistory.filter(
                (item) => item.query.trim().toLowerCase() !== trimmedQuery.toLowerCase()
            );
            
            // Agregar la nueva búsqueda al principio
            updatedHistory = [{ ...newSearchEntry, query: query }, ...updatedHistory];
            
            // Si excede el máximo, eliminar la más antigua
            if (updatedHistory.length > MAX_HISTORY_LENGTH) {
                updatedHistory = updatedHistory.slice(0, MAX_HISTORY_LENGTH);
            }
            
            // Actualizar estado local y guardar en AsyncStorage
            setSearchHistory(updatedHistory);
            await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        } catch (error) {
            console.error("Error al guardar en el historial de búsquedas", error);
        }
    };
    
    const handleDeleteFromHistoric = async (query: string) => {
        const storedHistory = await AsyncStorage.getItem('searchHistory');
        if (storedHistory !== null) {
            let historicParsed: any[] = JSON.parse(storedHistory);

            // cogemos solo los que no coinciden con la query (case-insensitive)
            historicParsed = historicParsed.filter(item => item.query.toLowerCase() !== query.toLowerCase());
            
            setSearchHistory(historicParsed);
            await AsyncStorage.setItem('searchHistory', JSON.stringify(historicParsed));
        }
    }


    // Función para realizar la búsqueda
    const fetchPlaces = async (query: string) => {
        setRequestSent(true);
        setLoading(true);
        setProgress(0);  // Reiniciar el progreso cuando empieza una nueva búsqueda

        const response = await getPlacesByText(query);
        setPlaces(response.sites);
        setLoading(false);

        // Guardar la búsqueda y los resultados en el historial
        addSearchToHistory(query, response.sites);
    };

    // Efecto para incrementar el progreso poco a poco
    useEffect(() => {
        if (loading && progress < 0.8) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => Math.min(prevProgress + 0.1, 0.8));  // Incrementa hasta 80%
            }, 1300);  // Incrementar cada 300ms

            return () => clearInterval(interval);  // Limpiar intervalo cuando se desmonte
        }
    }, [loading, progress]);

    // Efecto para cargar la búsqueda desde la ruta, si existe
    useEffect(() => {
        if (route.params?.searchText) {
            fetchPlaces(route.params.searchText);
        }
    }, [route.params?.searchText]);

    const handleSearchSubmit = () => {
        if (searchText.trim()) {
            fetchPlaces(searchText.trim());
        }
    };

    const handleSelectHistoricItem = (item: { query: string, results: Array<any> }) => {
        setSearchText(item.query);
        setPlaces(item.results);
        setRequestSent(true);
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
                    inputStyle={{ color: AppStyles.mainBlackColor }}
                    placeholderTextColor={AppStyles.mainBlackColor}
                    round
                    showCancel
                    placeholder='Busca un sitio para valorar...'
                    value={searchText}
                    onSubmitEditing={handleSearchSubmit}
                    onChangeText={setSearchText}
                    leftIcon={{ name: 'search', color: AppStyles.mainBlackColor }}
                />
            </View>

            {requestSent && (
                <View style={styles.resultContainer}>
                    <ResultList
                        data={places}
                        noItemsMessage="No se encontraron resultados"
                        isLoading={loading}
                        progress={progress}  // Pasar el valor del progreso
                        loadingText='Buscando sitios... Esto puede tardar unos segundos'
                        renderItemComponent={(item) => <ListCard site={item} />}
                    />
                </View>
            )}

            {/* Mostrar historial de búsquedas */}
            {!requestSent && searchHistory.length > 0 && (
                <View style={styles.historyContainer}>
                    <Text style={styles.historyTitle}>Historial de Búsquedas</Text>
                    <FlatList
                        data={searchHistory}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <>
                                <TouchableOpacity onPress={() => handleSelectHistoricItem(item)} style={styles.historyItem}>
                                    <Text style={styles.historyText}>{item.query}</Text>
                                    <TouchableOpacity onPress={() => handleDeleteFromHistoric(item.query)}>
                                        <Icon name="trash" size={18} color={AppStyles.mainRedColor} style={{padding: 2}} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                {index < searchHistory.length - 1 && <Divider width={2.5} color={AppStyles.mainBlackColor}/>}
                            </>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.backgroundColor,
    },
    searchContainer: {
        paddingHorizontal: 10,
        //paddingBottom: 10,
        backgroundColor: AppStyles.backgroundColor,
    },
    searchBar: {
        backgroundColor: AppStyles.backgroundColor,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        height: 60,
    },
    searchBarInput: {
        height: 45,
        backgroundColor: AppStyles.white,
        color: AppStyles.mainBlackColor,
        borderWidth: 2,
        borderColor: AppStyles.mainBlackColor,
    },
    resultContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    historyContainer: {
        padding: 10,
        marginHorizontal: 10,
    },
    historyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: AppStyles.mainBlackColor,
        paddingLeft: 20
    },
    historyItem: {
        backgroundColor: AppStyles.secondaryBlueColor,
        // paddingBottom: 13,
        paddingHorizontal: 20,
        borderRadius: 5,
        //borderBottomWidth: 1,
        borderColor: AppStyles.mainBlackColor,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    historyText: {
        fontSize: 18,
        color: AppStyles.mainBlackColor,
        fontWeight: '500',
    },
});
