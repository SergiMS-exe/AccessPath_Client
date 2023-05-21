import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { LoginScreen } from './screens/LoginScreen';
import { Home } from './screens/Home';
import { RegistroScreen } from './screens/RegistroScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();

function App() {
    return (
        <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{headerShown: false}}
                initialRouteName='login'
                >
                <Stack.Screen name="login" component={LoginScreen}/>
                <Stack.Screen name="register" component={RegistroScreen}/>
                <Stack.Screen name="home" component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
);
}

export default App;