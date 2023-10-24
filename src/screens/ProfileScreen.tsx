import React, { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { LoginContext } from '../components/Shared/Context';
import { logout } from '../services/UserServices';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Text } from '@rneui/base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import MainButton from '../components/MainButton';

type StackProps = NativeStackNavigationProp<any, any>;
type DrawerProps = DrawerNavigationProp<any, any>;

export const getUserIcon = (dasibily: string) => {
    switch (dasibily) {
        case "Física":
            return "wheelchair";
        case "Sensorial":
            return "eye";
        case "Psíquica":
            return "brain";
        default:
            return "user";
    }
}

export const ProfileScreen = () => {

    const stackNavigation = useNavigation<StackProps>();
    const drawerNavigation = useNavigation<DrawerProps>();

    const { setUser, user } = useContext(LoginContext)

    useEffect(() => {
        //console.log(user);
        if (!user) {
            drawerNavigation.navigate("Feed")
        }
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Icon name={getUserIcon(user!.tipoDiscapacidad)} size={60} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.name}>{user?.nombre} {user?.apellidos}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>
            </View>

            <MainButton iconName='user-edit' title='Editar Perfil' onPress={() => stackNavigation.navigate("editProfile")} />
            {/* <ProfileButton iconName='universal-access' title='Prefencias de accesibilidad' onPress={() => {}}/> */}
            <MainButton iconName='star' title='Mis Valoraciones' onPress={() => stackNavigation.navigate("myRatings")} />
            <MainButton iconName='comment' title='Mis Comentarios' onPress={() => stackNavigation.navigate("myComments")} />
            <MainButton iconName='sign-out-alt' color='red' title='Cerrar Sesión'
                onPress={async () => {
                    await logout(setUser)
                    drawerNavigation.navigate("Feed")
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
        borderBottomWidth: 0.3,
        borderBottomColor: 'black',
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