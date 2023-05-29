
import { MapSitesScreen } from './MapSitesScreen';
import { ListSitesScreen } from './ListSitesScreen';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const Feed = () => {        
    return (
        <View style={{flex:1}}>
            <Stack.Navigator screenOptions={{headerShown: false}} >
                <Stack.Screen name="Map" component={MapSitesScreen} />
                <Stack.Screen name="List" component={ListSitesScreen} />
            </Stack.Navigator>
        </View>
        

  );
}