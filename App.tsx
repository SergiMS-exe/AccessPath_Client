import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableLatestRenderer } from 'react-native-maps';

import { LoginScreen } from './src/screens/LoginScreen';
import { Home } from './src/screens/Home';
import { RegistroScreen } from './src/screens/RegistroScreen';
import { LoginContext } from './src/components/Shared/Context';

import useLoginContext from './src/hooks/useLoginContext';
import { SearchScreen } from './src/screens/SearchScreen';
import { SiteScreen } from './src/screens/SiteScreen';
import { FormScreen } from './src/screens/FormScreen';
import { EditProfile } from './src/screens/Profile/EditProfile';
import { MyComments } from './src/screens/Profile/MyComments';
import { MyRatings } from './src/screens/Profile/MyRatings';
import AddPhoto from './src/screens/AddPhoto';

enableLatestRenderer();

const Stack = createNativeStackNavigator();

function App() {

    const { user, setUser } = useLoginContext();

    return (
        <LoginContext.Provider value={{ user, setUser }}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{ headerShown: false }}
                        initialRouteName='home'
                    >
                        <Stack.Screen name="login" component={LoginScreen} />
                        <Stack.Screen name="register" component={RegistroScreen} />
                        <Stack.Screen name="home" component={Home} />
                        <Stack.Screen name='search' component={SearchScreen} />
                        <Stack.Screen name='site' component={SiteScreen} />
                        <Stack.Screen name='addPhoto' component={AddPhoto} />
                        <Stack.Screen name='form' component={FormScreen} />
                        {/* Parte del profile */}
                        <Stack.Screen name='editProfile' component={EditProfile} />
                        <Stack.Screen name='myComments' component={MyComments} />
                        <Stack.Screen name='myRatings' component={MyRatings} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </LoginContext.Provider>
    );
}

export default App;