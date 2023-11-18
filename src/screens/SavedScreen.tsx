import React, { useContext, useEffect, useState } from 'react';
import { ResultList } from '../components/Card/ResultList';
import { Site } from '../../@types/Site';
import { ListCard } from '../components/Card/ListCard';  // Assuming you have this component
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSavedSites } from '../services/UserServices';
import { LoginContext } from '../components/Shared/Context';
import Snackbar from 'react-native-snackbar';

export const SavedScreen = () => {
    const { user } = useContext(LoginContext);

    const [savedSites, setSavedSites] = useState<Site[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const isFocused = useIsFocused();

    useEffect(() => {
        const getSites = async () => {
            try {
                const getSavedSitesResponse = await getSavedSites(user!);
                if (getSavedSitesResponse.success) {
                    setSavedSites(getSavedSitesResponse.sites)
                } else if ('error' in getSavedSitesResponse) {
                    Snackbar.show({
                        text: getSavedSitesResponse.error,
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
                setIsLoading(false);

            } catch (error) {
                console.error("Error al obtener sitios guardados: ", error);
            }
        };
        if (isFocused)
            getSites();

    }, [isFocused]);

    return (
        <ResultList
            data={savedSites}
            noItemsMessage="No tienes sitios guardados"
            isLoading={isLoading}
            renderItemComponent={(item) => <ListCard site={item} />}
        />
    );
}
