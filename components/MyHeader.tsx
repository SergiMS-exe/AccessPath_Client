import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type DrawerProp = DrawerNavigationProp<any, any>;

const MyHeader: React.FC = () => {
  const navigation = useNavigation<DrawerProp>();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={{...styles.header, paddingTop: insets.top}}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={styles.menu}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>MI TÍTULO</Text>
      <Text style={styles.title}>P</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: '#000',
    zIndex:1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  menu: {
    fontSize: 30,
  }
});

export default MyHeader;
