
import { MapSitesScreen } from './MapSitesScreen';
import { ListSitesScreen } from './ListSitesScreen';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { CloseSitesContext } from '../../components/Shared/Context';
import { getCloseSites } from '../../services/PlacesServices';
import { useLocation } from '../../hooks/useLocation';
import useSitesContext from '../../hooks/useSitesContext';
import { Site } from '../../../@types/Site';

const Stack = createNativeStackNavigator();

export const Feed = () => {

    const { sites, setSites, applyFilters, appliedFilters, filteredSites } = useSitesContext();
    const { location } = useLocation();

    // obtiene los sitios cercanos al usuario
    useEffect(() => {
        const fetchSites = async () => {
            const response: Site[] = await getCloseSites(location);
            setSites(response);
        };

        fetchSites();
    }, [location]);  // Añadí location como dependencia para que el efecto se ejecute cuando location cambie


    return (
        <CloseSitesContext.Provider value={{ sites, setSites, applyFilters, appliedFilters, filteredSites }}>
            <View style={{ flex: 1 }}>
                <Stack.Navigator screenOptions={{ headerShown: false }} >
                    <Stack.Screen name="Map" component={MapSitesScreen} />
                    <Stack.Screen name="List" component={ListSitesScreen} />
                </Stack.Navigator>
            </View>
        </CloseSitesContext.Provider>
    );
}