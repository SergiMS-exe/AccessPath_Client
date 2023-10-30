import { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Titulo } from '../../components/Titulo';
import { ListCard } from '../../components/Card/ListCard';
import { ResultList } from '../../components/Card/ResultList';
import MyFAB from '../../components/FloatingButton';
import { CloseSitesContext, initialFilters } from '../../components/Shared/Context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FilterModal from '../../components/FilterModal';
import { Site } from '../../../@types/Site';

export const ListSitesScreen = () => {

    const { sites, filteredSites, appliedFilters } = useContext(CloseSitesContext);

    const [showModal, setShowModal] = useState(false);
    const [sitesToShow, setSitesToShow] = useState<Site[]>([]);

    useEffect(() => {
        if (filteredSites.length > 0 && appliedFilters != initialFilters) {
            setSitesToShow(filteredSites);
        } else {
            setSitesToShow(sites);
        }
    }, [sites, filteredSites]);

    return (
        <>
            <View style={{ flex: 1 }}>
                <ResultList
                    data={sitesToShow}
                    noItemsMessage='No hay sitios valorados cerca de ti'
                    isLoading={false}
                    renderItemComponent={(item) => <ListCard site={item} />}
                    title={
                        <View style={styles.titleContainer}>
                            <Titulo title='Sitios cercanos' />
                            <TouchableOpacity style={styles.filterButton} onPress={() => setShowModal(true)}>
                                <Icon style={{ marginBottom: 5 }} name='filter-alt' size={30} />
                            </TouchableOpacity>
                        </View>
                    }
                />
                <MyFAB
                    name='list'
                    loading={false}
                    showing={true}
                />
            </View>
            <FilterModal visible={showModal} onClose={() => setShowModal(false)} />
        </>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10
    },
    filterButton: {
        marginTop: 10
    }
});