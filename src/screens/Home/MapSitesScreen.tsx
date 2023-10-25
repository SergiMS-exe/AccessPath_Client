import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Map } from '../../components/Map';
import MyFAB from '../../components/FloatingButton';
import { FAB } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MapSitesScreen = () => {

    const [showButton, setShowButton] = useState(true);

    return (
        <>
            <Map setShowButton={setShowButton} />
            <FAB
                style={[styles.fab, Platform.OS === 'android' && styles.androidFab]}
                icon={<Icon name='filter-alt' size={30} />}
                color='white'
            />
            <MyFAB
                name='map'
                loading={false}
                showing={showButton}
            />
        </>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 10,
        right: 20,
        top: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        shadowColor: "#000",
        backgroundColor: 'white'
    },
    androidFab: {
        right: 50
    }
});
