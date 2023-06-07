import React, { useContext, useEffect, useState } from 'react';
import { Titulo } from '../components/Titulo';
import { ResultList } from '../components/Card/ResultList';
import { LoginContext } from '../components/Shared/Context';
import { getSavedSites } from '../services/PlacesServices';
import { Site } from '../../@types/Site';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SavedScreen = () => {
    const { user } = useContext(LoginContext);

    const [savedSites, setSavedSites] = useState<Site[]>([])

    useEffect(() => {
        const fetchData = async () => {
            if (user !== undefined) {
                const sites = await getSavedSites(user);
                setSavedSites(sites);
            }
        };

        fetchData();
    }, [])

    return (
        <>
            <ResultList data={savedSites} title='Sitios guardados' noItemsMessage='No hay sitios guardados'/>
        </>
    )
}