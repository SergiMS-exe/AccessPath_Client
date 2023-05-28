import React, { useContext } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { SavedScreen } from './SavedScreen';
import { Feed } from './Home/Feed';
import { LoginContext } from '../components/Shared/Context';
import MyHeader from '../components/MyHeader';
import { StyleSheet, View } from 'react-native';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex:2
    },
    headerSpacer: {
        height: 60
    },
});

function CustomDrawerContent() {
    return (
        <View style={styles.container}>
            <View style={styles.headerSpacer} />
        </View>
    );
}  

export const Home = () => {

    const {user} = useContext(LoginContext);

    return (
        <Drawer.Navigator initialRouteName='Feed'
        screenOptions={{
            header: () => <MyHeader/>
        }}
        >
            <Drawer.Screen name="Feed" component={Feed} options={{ drawerLabel: 'Home' }}/>
            <Drawer.Screen name="Saved" component={SavedScreen}/>

        </Drawer.Navigator>
    );
}