import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { DrawerActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome5';

type DrawerProp = DrawerNavigationProp<any, any>;
type RoutePropType = RouteProp<any, any>;

type Props = {
    searchBar?: boolean;
    searchText?: string;
    onSearchTextChange: (text: string) => void;
}

const DrawerHeader = ({ searchBar, searchText, onSearchTextChange }: Props) => {
    const navigation = useNavigation<DrawerProp>();
    const route = useRoute<RoutePropType>();

    const isInSearch = route.name == 'Search'

    return (
        <SafeAreaView edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={isInSearch ? () => navigation.goBack() : () => {
                    console.log(DrawerActions)
                    navigation.dispatch(DrawerActions.openDrawer());}}>
                    <Icon name={isInSearch ? 'arrow-left' : 'bars'} size={30} />
                </TouchableOpacity>
                {searchBar ? (
                <SearchBar
                    containerStyle={styles.searchBar}
                    inputContainerStyle={styles.searchBarInput}
                    round
                    lightTheme
                    showCancel
                    placeholder='Busca un sitio para valorar...'
                    value={searchText}
                    onSubmitEditing={async () => {
                        navigation.navigate('search', { searchText: searchText })
                    }}
                    onChangeText={onSearchTextChange}
                />) : (
                <View style={styles.searchBar}/>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#f8f8f8',
        paddingLeft: 15,
        borderBottomWidth: 0.2,
        borderBottomColor: '#000',
        zIndex: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    menu: {
        fontSize: 30,
        marginRight: 17
    },
    searchBar: {
        marginLeft: 10,
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderBottomColor: '#000',
        borderBottomWidth: 0.2,
        borderTopWidth: 0,
        height: 60
    },
    searchBarInput: {
        height: 45
    }
});

export default DrawerHeader;
