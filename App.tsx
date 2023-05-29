import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LoginScreen } from './src/screens/LoginScreen';
import { Home } from './src/screens/Home';
import { RegistroScreen } from './src/screens/RegistroScreen';
import { LoginContext } from './src/components/Shared/Context';

import useLoginContext from './src/hooks/useLoginContext';

const Stack = createNativeStackNavigator();

function App() {

    const {user, setUser} = useLoginContext();

    return (
        <LoginContext.Provider value={{user, setUser}}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator 
                        screenOptions={{headerShown: false}}
                        initialRouteName='home'
                        >
                        <Stack.Screen name="login" component={LoginScreen}/>
                        <Stack.Screen name="register" component={RegistroScreen}/>
                        <Stack.Screen name="home" component={Home}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </LoginContext.Provider>
);
}

export default App;