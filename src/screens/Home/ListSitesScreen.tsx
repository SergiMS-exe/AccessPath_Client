import { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { Titulo } from '../../components/Titulo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ListCard } from '../../components/Card/ListCard';
import { ResultList } from '../../components/Card/ResultList';
import { staticSites } from '../../services/PlacesServices';
import { AppStyles } from '../../components/Shared/AppStyles';
import MyFAB from '../../components/FloatingButton';
import { CloseSitesContext } from '../../components/Shared/Context';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props extends NativeStackScreenProps<any, any> { };

export const ListSitesScreen = ({ navigation }: Props) => {

    const { sites } = useContext(CloseSitesContext);

    return (
        <View style={{ flex: 1 }}>
            <ResultList
                data={sites}
                noItemsMessage='No hay sitios valorados cerca de ti'
                isLoading={false}  // Asumiendo que staticSites siempre tiene datos y no hay una carga en curso
                renderItemComponent={(item) => <ListCard site={item} />}
                title={
                    <View style={styles.titleContainer}>
                        <Titulo title='Sitios cercanos' />
                        <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('Filter')}>
                            <Icon style={{ marginBottom: 5 }} name='filter-alt' size={30} />
                        </TouchableOpacity>
                    </View>
                }
            />
            {/* <FloatingButton onPress={() => navigation.navigate('Map')} text='Ver Mapa' /> */}
            <MyFAB
                name='list'
                loading={false}
                showing={true}
            />
        </View>
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