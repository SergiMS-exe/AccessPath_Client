import React, { useContext, useState } from 'react';

import { DrawerContentComponentProps, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { SavedScreen } from './SavedScreen';
import { Feed } from './Home/Feed';
import { LoginContext } from '../components/Shared/Context';
import DrawerHeader from '../components/Headers/DrawerHeader';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { LoginScreen } from './LoginScreen';
import { RegistroScreen } from './RegistroScreen';
import { logout } from '../services/UserServices';
import { ProfileScreen } from './ProfileScreen';
import { SearchScreen } from './SearchScreen';
import { RouteProp } from '@react-navigation/native';

type DrawerButtonProps = {
    screenName?: string;
    text: string;
    iconName: string;
    navigation: DrawerNavigationHelpers;
}

type RootDrawerParamList = {
    Feed: undefined;
    Saved: undefined;
    Perfil: undefined;
    Login: undefined;
    Registro: undefined;
    Search: { searchText?: string };
};


const Drawer = createDrawerNavigator<RootDrawerParamList>();

const styles = StyleSheet.create({
    userName: {
        fontSize: 20,
        fontWeight: '600',
        paddingBottom: 3
    },
    userEmail: {
        fontSize: 15
    },
    contentScrollView: {
        paddingHorizontal: 20,
        paddingTop: 30
    },
    contentHeader: {
        borderColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingBottom: 7
    },
    contentBody: {
        borderColor: 'black',
        //borderWidth: 0.4,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    contentFooter: {
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderColor: 'black',
        marginBottom: 20
    },
    button: {
        marginHorizontal: 5,
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: 'purple',
        borderRadius: 7,
        borderBottomColor: 'black',
        borderBottomWidth: 0.4,
    },
    icon: {
        marginRight: 15,
        width: 30,
        textAlign: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: '600'
    }
});

function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {

    const { user } = useContext(LoginContext);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView style={styles.contentScrollView}
                contentContainerStyle={{ paddingTop: 0 }}>
                {user &&
                    <View style={styles.contentHeader}>
                        {/* Nombre y email */}
                        <Text style={styles.userName}>{user?.nombre} {user?.apellidos}</Text>
                        <Text style={styles.userEmail}>{user?.email}</Text>
                    </View>}
                <View style={styles.contentBody}>
                    <DrawerContentButton
                        navigation={navigation}
                        screenName='Feed'
                        text='Inicio'
                        iconName='home'
                    />
                    {
                        user && (
                            <>
                                <DrawerContentButton
                                    navigation={navigation}
                                    screenName='Saved'
                                    text='Sitios Guardados'
                                    iconName='bookmark'
                                />
                                <DrawerContentButton
                                    navigation={navigation}
                                    screenName='Perfil'
                                    text='Perfil'
                                    iconName='user-cog'
                                />
                            </>
                        )
                    }
                </View>
            </DrawerContentScrollView>
            <View style={styles.contentFooter}>
                {user == undefined ? (
                    <>
                        <DrawerContentButton
                            navigation={navigation}
                            screenName='Login'
                            text='Iniciar Sesión'
                            iconName='sign-in-alt' />
                        <DrawerContentButton
                            navigation={navigation}
                            screenName='Registro'
                            text='Registrarse'
                            iconName='user-plus' />
                    </>
                ) : (
                    <DrawerContentButton
                        navigation={navigation}
                        text='Cerrar Sesión'
                        iconName='sign-out-alt' />
                )}
            </View>
        </SafeAreaView>

    );
}

function DrawerContentButton({ navigation, screenName = '', text, iconName }: DrawerButtonProps) {

    const { setUser } = useContext(LoginContext)
    const logoutTernary = iconName == 'sign-out-alt' ? '#E94A47' : 'black'
    return (
        <TouchableOpacity
            onPress={async () => {
                iconName !== 'sign-out-alt'
                    ? navigation.navigate(screenName)
                    : (await logout(setUser), navigation.navigate('Feed'))
            }}
            style={styles.button}
        >
            <Icon name={iconName} size={23} style={{ ...styles.icon, color: logoutTernary }} />
            <Text style={{ ...styles.text, color: logoutTernary }}>{text}</Text>

        </TouchableOpacity>
    )
}


export const Home = () => {

    const [searchText, setSearchText] = useState('');

    return (
        <Drawer.Navigator
            initialRouteName='Feed'
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                header: () => <DrawerHeader searchText={searchText} onSearchTextChange={setSearchText} />
            }}
        >
            <Drawer.Screen name="Feed" component={Feed} options={{
                header: () => <DrawerHeader searchBar={true} searchText={searchText} onSearchTextChange={setSearchText} />
            }}
            />
            <Drawer.Screen name="Saved" component={SavedScreen} options={{
                header: () => <DrawerHeader title='Sitios Guardados' />

            }} />
            <Drawer.Screen name="Perfil" component={ProfileScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Registro" component={RegistroScreen} />
        </Drawer.Navigator>
    );
}