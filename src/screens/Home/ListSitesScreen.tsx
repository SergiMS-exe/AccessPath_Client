import { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Titulo } from '../../components/Titulo';
import { ListCard } from '../../components/Card/ListCard';
import { ResultList } from '../../components/Card/ResultList';
import MyFAB from '../../components/FloatingButton';
import { CloseSitesContext, initialFilters } from '../../components/Shared/Context';
import { Site } from '../../../@types/Site';
import FilterFAB from '../../components/FilterFAB';
import { AppStyles } from '../../components/Shared/AppStyles';

export const ListSitesScreen = () => {

    const { sites, filteredSites, appliedFilters } = useContext(CloseSitesContext);

    const [sitesToShow, setSitesToShow] = useState<Site[]>([]);
    const [fabStyle, setFabStyle] = useState({} as any);

    useEffect(() => {
        if ((filteredSites.length > 0) || (filteredSites.length === 0 && appliedFilters != initialFilters)) {
            setSitesToShow(filteredSites);
        } else {
            setSitesToShow(sites);
        }
    }, [sites, filteredSites]);

    useEffect(() => {
        if (sitesToShow.length === 0)
            setFabStyle({ top: 45 })
        else
            setFabStyle({ top: 0 })
    }, [sitesToShow]);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: AppStyles.backgroundColor }}>
                <ResultList
                    data={sitesToShow}
                    noItemsMessage='No hay sitios valorados cerca de ti'
                    isLoading={false}
                    renderItemComponent={(item) => <ListCard site={item} />}
                    title={
                        <View style={styles.titleContainer}>
                            <Titulo title='Sitios cercanos' />
                        </View>
                    }
                />
                <MyFAB
                    name='list'
                    loading={false}
                    showing={true}
                />
            </View>
            <FilterFAB style={fabStyle} />
        </>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 70,
        marginBottom: 20
    },
    filterButton: {
        marginTop: 10
    }
});