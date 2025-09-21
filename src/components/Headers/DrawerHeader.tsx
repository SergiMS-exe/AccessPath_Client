import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconMaterial from "react-native-vector-icons/FontAwesome";
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppStyles } from '../Shared/AppStyles';

type DrawerProp = DrawerNavigationProp<any, any>;
type RoutePropType = RouteProp<any, any>;

type Props = {
    searchBar?: boolean;
    searchText?: string;
    title?: string;
    iconRight?: string;
    onPressRight?: () => void;
    onSearchTextChange?: (text: string) => void;
}

const DrawerHeader = ({ searchBar, searchText, title, iconRight, onPressRight, onSearchTextChange }: Props) => {
    const navigation = useNavigation<DrawerProp>();
    const route = useRoute<RoutePropType>();

    const isInSearch = route.name == 'Search'

    const accessibilityHint = isInSearch ? 'Volver a la pantalla anterior' : 'Abrir el menu lateral';
    const accessibilityLabel = isInSearch ? 'Volver' : 'Menu lateral';

    return (
        <SafeAreaView edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.floatingLeft} onPress={isInSearch ? () => navigation.goBack() : () => { navigation.dispatch(DrawerActions.openDrawer()); }}
                    accessible accessibilityHint={accessibilityHint} accessibilityRole='button' accessibilityLabel={accessibilityLabel}>
                    <Icon name={isInSearch ? 'arrow-left' : 'bars'} size={30} color={AppStyles.mainBlackColor} />
                </TouchableOpacity>
                {title ? (
                    <Text style={styles.titleText}>{title}</Text>
                ) : searchBar ? (
                    <SearchBar
                        accessibilityValue={searchText ? { text: searchText } : { text: 'Busca un sitio para valorar...' }}
                        accessibilityRole='search'
                        accessible
                        accessibilityLabel='Buscador de sitios'
                        containerStyle={styles.searchBar}
                        inputContainerStyle={styles.searchBarInput}
                        inputStyle={{ color: '#727272' }}
                        placeholderTextColor={'#727272'}
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
                    <View style={styles.searchBar} />
                )}
                {(iconRight && onPressRight) &&
                    <TouchableOpacity style={{backgroundColor: AppStyles.backgroundColor, ...styles.floatingRight}} onPress={onPressRight}>
                        <IconMaterial name={iconRight} size={30} style={{ marginRight: 20 }}
                            color={AppStyles.mainBlackColor} />
                    </TouchableOpacity>
                }
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
        backgroundColor: AppStyles.backgroundColor,
        paddingLeft: 15,
        //borderBottomWidth: 0.2,
        borderBottomColor: '#000',
        zIndex: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    titleText: {
        fontSize: AppStyles.headerFontWeight,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: AppStyles.mainBlackColor
    },
    menu: {
        fontSize: 30,
        marginRight: 17
    },
    searchBar: {
        marginLeft: 10,
        flex: 1,
        backgroundColor: AppStyles.backgroundColor,
        //borderBottomColor: '#000',
        //borderBottomWidth: 0.2,
        borderTopWidth: 0,
        height: 60
    },
    searchBarInput: {
        height: 45,
        backgroundColor: '#e2e2e2',
        color: '#727272'
    },
    floatingLeft: {
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 2
    },
    floatingRight: {
        position: 'absolute',
        top: 12,
        right: 0,
        zIndex: 2
    }
});

export default DrawerHeader;
