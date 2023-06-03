import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";


export const StackHeader = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' size={30} />
                </TouchableOpacity>
                
                <View style={styles.blank}/>
                
            </View>
        </SafeAreaView>
    )
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
    blank: {
        marginLeft: 10,
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderBottomColor: '#000',
        borderBottomWidth: 0.2,
        borderTopWidth: 0,
        height: 60
    },
});