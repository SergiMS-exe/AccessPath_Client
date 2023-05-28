import React, { useContext } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SavedScreen } from './SavedScreen';
import { Feed } from './Home/Feed';
import { ProfileScreen } from './ProfileScreen';
import { LoginContext } from '../components/Shared/Context';
import { LoginScreen } from './LoginScreen';
import MyHeader from '../components/MyHeader';
import { StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();
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

    // return (
    //     <Tab.Navigator
    //         screenOptions={{headerShown: false}}>
    //         <Tab.Screen name="Feed" component={Feed}/>
    //         {user !== undefined ? (
    //             <><Tab.Screen name="Saved" component={SavedScreen} /><Tab.Screen name="Profile" component={ProfileScreen} /></>
    //             ) : (
    //             <><Tab.Screen name="Saved" component={LoginScreen} /><Tab.Screen name="Profile" component={LoginScreen} /></>
    //         )}
            
    //     </Tab.Navigator>
    // )

    return (
        <Drawer.Navigator initialRouteName='Feed'
        // drawerContent={()=><CustomDrawerContent/>}
        
        screenOptions={{
            header: () => <MyHeader/>,
            headerStyle: {height: 60}
            // headerShown: false
        }}
        >
            <Drawer.Screen name="Feed" component={Feed} options={{ drawerLabel: 'Home' }}/>
            <Drawer.Screen name="Saved" component={SavedScreen}/>

        </Drawer.Navigator>
    );
}