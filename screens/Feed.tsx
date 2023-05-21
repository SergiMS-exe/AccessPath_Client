import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MapSitesScreen } from './MapSitesScreen';
import { ListSitesScreen } from './ListSitesScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export const Feed = () => {
    const insets = useSafeAreaInsets();
        
    return (
        <Tab.Navigator tabBarPosition='top' style={{paddingTop:insets.top}}>
            <Tab.Screen name="Map" component={MapSitesScreen} />
            <Tab.Screen name="List" component={ListSitesScreen} />
        </Tab.Navigator>

  );
}