import React, { useContext, useEffect, useState } from 'react';
import { ResultList } from '../components/Card/ResultList';
import { Site } from '../../@types/Site';
import { ListCard } from '../components/Card/ListCard';  // Assuming you have this component
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getSavedSites } from '../services/UserServices';
import { LoginContext } from '../components/Shared/Context';
import Snackbar from 'react-native-snackbar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const SavedScreen = () => {
    const { user } = useContext(LoginContext);
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();


    const [savedSites, setSavedSites] = useState<Site[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (!user) {
            navigation.navigate('Login', { viewFrom: 'Saved' });
            return;
        }

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
