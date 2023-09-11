import React, { useEffect, useState } from 'react';
import { ResultList } from '../components/Card/ResultList';
import { Site } from '../../@types/Site';
import { ListCard } from '../components/Card/ListCard';  // Assuming you have this component
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SavedScreen = () => {
    const [savedSites, setSavedSites] = useState<Site[]>([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        const getSitesFromStorage = async () => {
            try {
                const savedSitesJson = await AsyncStorage.getItem("savedSites");
                if (savedSitesJson) {
                    const savedSitesFromStorage: Site[] = JSON.parse(savedSitesJson);
                    setSavedSites(savedSitesFromStorage);
                }
            } catch (error) {
                console.error("Error al obtener sitios guardados de AsyncStorage:", error);
            }
        };

        getSitesFromStorage();
        
    }, [isFocused]);

    return (
        <ResultList 
            data={savedSites} 
            noItemsMessage="No tienes sitios guardados" 
            isLoading={savedSites.length === 0}
            renderItemComponent={(item) => <ListCard site={item} />}
        />
    );
}
