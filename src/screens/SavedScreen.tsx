import React, { useContext, useEffect, useState } from 'react';
import { ResultList } from '../components/Card/ResultList';
import { Site } from '../../@types/Site';
import { ListCard } from '../components/Card/ListCard';  // Assuming you have this component
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSavedSites } from '../services/UserServices';
import useRef from 'react';
import { LoginContext } from '../components/Shared/Context';

export const SavedScreen = () => {
    const { user } = useContext(LoginContext);

    const [savedSites, setSavedSites] = useState<Site[]>([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        const getSites = async () => {
            try {
                const savedSitesJson = undefined// await AsyncStorage.getItem("savedSites");
                if (savedSitesJson) {
                    const savedSitesFromStorage: Site[] = JSON.parse(savedSitesJson);
                    setSavedSites(savedSitesFromStorage);
                } else {
                    const savedSitesFromAPI = await getSavedSites(user!);
                    setSavedSites(savedSitesFromAPI)
                }
            } catch (error) {
                console.error("Error al obtener sitios guardados: ", error);
            }
        };

        getSites();

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
