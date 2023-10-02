import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Site } from "../../../@types/Site"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        zIndex: 1000,
        marginLeft: '2.5%',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        height: '35%',
        width: '95%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 6
    }
})

type StackProps = NativeStackNavigationProp<any, any>;

export const MapCard = (site: Site) => {

    const navigation = useNavigation<StackProps>();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("site", { site })}>
            <Text>HI</Text>
        </TouchableOpacity>
    )
}