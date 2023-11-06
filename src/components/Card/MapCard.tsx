import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Site } from "../../../@types/Site";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AppStyles } from "../Shared/AppStyles";
import App from "../../../App";

type StackProps = NativeStackNavigationProp<any, any>;

type Props = {
    site: Site;
}

export const MapCard = ({ site }: Props) => {

    const navigation = useNavigation<StackProps>();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("site", { site })}>
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{site.nombre}</Text>
                <Icon name='map-marker-alt' size={17} color='red' />
            </View>
            <Text style={styles.address}>{site.direccion}</Text>
            <Text style={styles.rating}>{site.calificacionGoogle}/5 <Icon size={16} name='star' color='#e8e82e' solid style={{ borderWidth: 0.5, borderColor: 'black' }} /></Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1000,
        marginLeft: '2.5%',
        borderWidth: AppStyles.border.borderWidth,
        borderTopColor: AppStyles.border.borderColor,
        backgroundColor: 'white',
        height: '35%',
        width: '95%',
        position: 'absolute',
        bottom: 10,
        borderRadius: 20,
        padding: 15,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        flex: 1,
        color: AppStyles.mainBlackColor
    },
    address: {
        marginBottom: 4,
        fontSize: 16,
    },
    rating: {
        alignSelf: 'flex-end',
    }
})
