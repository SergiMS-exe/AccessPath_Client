import React, { useContext } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SavedScreen } from './SavedScreen';
import { Feed } from './Feed';
import { ProfileScreen } from './ProfileScreen';
import { LoginContext } from '../components/Shared/Context';
import { LoginScreen } from './LoginScreen';

const Tab = createBottomTabNavigator();

export const Home = () => {

    const {user} = useContext(LoginContext);

    return (
        <Tab.Navigator
            screenOptions={{headerShown: false}}>
            <Tab.Screen name="Feed" component={Feed}/>
            {user !== undefined ? (
                <><Tab.Screen name="Saved" component={SavedScreen} /><Tab.Screen name="Profile" component={ProfileScreen} /></>
                ) : (
                <><Tab.Screen name="Saved" component={LoginScreen} /><Tab.Screen name="Profile" component={LoginScreen} /></>
            )}
            
        </Tab.Navigator>
    )
}