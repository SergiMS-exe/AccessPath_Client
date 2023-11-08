import React from 'react';
import { FAB } from '@rneui/themed';
import { Platform, StyleSheet, View } from 'react-native';
import { AppStyles } from './Shared/AppStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    name: 'map' | 'list';
    loading: boolean;
    showing: boolean;
}

type StackProps = NativeStackNavigationProp<any, any>;

const MyFAB = ({ name, loading, showing }: Props) => {

    const navigation = useNavigation<StackProps>();

    const getFABConfig = () => {
        switch (name) {
            case 'list':
                return {
                    title: 'Ver Mapa',
                    icon: { name: 'map', size: 30 },
                    onPress: () => navigation.navigate('Map')
                };
            case 'map':
            default:
                return {
                    title: 'Ver Lista',
                    icon: { name: 'list', size: 30 },
                    onPress: () => navigation.navigate('List')
                };
        }
    }

    const { title, icon, onPress } = getFABConfig();

    const fabContainerStyle = Platform.OS === 'ios' && name === 'map' ? [styles.fabContainer, styles.fabIOSContainer] : [styles.fabContainer, styles.fabDefault];
    const fabButtonStyle = Platform.OS === 'ios' ? [styles.fab, styles.fabIOSButton] : styles.fab;

    return (
        <View style={fabContainerStyle}>
            <FAB
                placement='right'
                visible={showing}
                loading={loading}
                onPress={onPress}
                title={title}
                icon={icon}
                color={AppStyles.mainBlueColor}
                style={fabButtonStyle}
                titleStyle={styles.fabTitle}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        bottom: 25,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        shadowColor: "#000",
    },
    fab: {
        zIndex: 1,
        opacity: 0.85,
        backgroundColor: AppStyles.mainBlueColor,
    },
    fabIOSContainer: {
        right: 60,
    },
    fabIOSButton: {
        height: 58,
        width: 174,
    },
    fabDefault: {
        right: 25,
    },
    fabTitle: {
        fontSize: 20,
        color: '#000000',
        fontWeight: '600',
    }
});

export default MyFAB;
