import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome5';

type DrawerProp = DrawerNavigationProp<any, any>;

const MyHeader: React.FC = () => {
    const navigation = useNavigation<DrawerProp>();

    return (
        <SafeAreaView edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name='bars' size={30} />
                </TouchableOpacity>
                {/* <View style={styles.searchBar}> */}
                <SearchBar
                    containerStyle={styles.searchBar}
                    inputContainerStyle={styles.searchBarInput}
                    round
                    lightTheme
                    showCancel
                    cancelIcon={<Icon name='delete'/>}
                    value='papa'
                    // onKeyPress={(e)=>{
                    //     if (e.nativeEvent.key=='Enter')
                    //         navigation.navigate('Search')
                    // }}
                    onSubmitEditing={() => {
                        console.log('message submitted...');
                        navigation.navigate('Search')  
                    }}
                    onClear={()=>{
                        navigation.goBack()
                        
                    }}
                />
                {/* </View> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#f8f8f8',
        paddingLeft: 15,
        borderBottomWidth: 0.2,
        borderBottomColor: '#000',
        zIndex: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    menu: {
        fontSize: 30,
        marginRight: 17
    },
    searchBar: {
        marginLeft: 10,
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderBottomColor: '#000',
        borderBottomWidth: 0.2,
        borderTopWidth: 0,
        height: 60
    },
    searchBarInput: {
        height: 45
    }
});

export default MyHeader;
