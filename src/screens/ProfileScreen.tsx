import React, { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { LoginContext } from '../components/Shared/Context';
import { logout } from '../services/UserServices';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Text } from '@rneui/base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import MainButton from '../components/MainButton';
import { TypesOfDisabilities } from '../../@types/Valoracion';
import { useRatings } from '../hooks/useRatings';
import { AppStyles } from '../components/Shared/AppStyles';

type StackProps = NativeStackNavigationProp<any, any>;
type DrawerProps = DrawerNavigationProp<any, any>;


export const ProfileScreen = () => {

    const stackNavigation = useNavigation<StackProps>();
    const drawerNavigation = useNavigation<DrawerProps>();

    const { setUser, user } = useContext(LoginContext)

    const { getDisabilitiesIcon } = useRatings();

    const isFocused = useIsFocused();

    useEffect(() => {
        if (!user) {
            drawerNavigation.navigate('Login', { viewFrom: "Perfil" });
            return;
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={{ backgroundColor: AppStyles.backgroundColor, flex: 1 }}>
            <View style={styles.headerContainer}>
                <Icon name={getDisabilitiesIcon(user?.tipoDiscapacidad)} color={AppStyles.mainBlackColor} size={60} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.name}>{user?.nombre} {user?.apellidos}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>
            </View>

            <MainButton iconName='user-edit' title='Editar Perfil' onPress={() => stackNavigation.navigate("editProfile")} />
            {/* <ProfileButton iconName='universal-access' title='Prefencias de accesibilidad' onPress={() => {}}/> */}
            <MainButton iconName='star' title='Mis Valoraciones' onPress={() => stackNavigation.navigate("myRatings")} />
            <MainButton iconName='comment' title='Mis Comentarios' onPress={() => stackNavigation.navigate("myComments")} />
            <MainButton iconName='image' title='Mis Fotos' onPress={() => stackNavigation.navigate("myPhotos")} />
            <MainButton iconName='sign-out-alt' color={AppStyles.mainRedColor} title='Cerrar Sesión'
                onPress={async () => {
                    drawerNavigation.navigate("Feed")
                    await logout(setUser)
                }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        height: 200,
        justifyContent: 'space-evenly',
        marginBottom: 30
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    email: {
        fontSize: 20
    },
});