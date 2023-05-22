import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LoginScreen } from './screens/LoginScreen';
import { Home } from './screens/Home';
import { RegistroScreen } from './screens/RegistroScreen';
import { LoginContext } from './components/Shared/Context';

import useLogin from './hooks/useLogin';

const Stack = createNativeStackNavigator();

function App() {

    const {user, setUser} = useLogin();

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