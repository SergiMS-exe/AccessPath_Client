import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SavedScreen } from './SavedScreen';
import { Feed } from './Feed';
import { ProfileScreen } from './ProfileScreen';

const Tab = createBottomTabNavigator();

export const Home = () => {
    return (
        <Tab.Navigator
            screenOptions={{headerShown: false}}>
            <Tab.Screen name="Feed" component={Feed}/>
            <Tab.Screen name="Saved" component={SavedScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    )
}