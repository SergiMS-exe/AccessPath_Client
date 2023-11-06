import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppStyles } from "../Shared/AppStyles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Site } from "../../../@types/Site";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
    container: {
        height: 120,
        padding: 12,
        borderColor: AppStyles.border.borderColor,
        borderWidth: AppStyles.border.borderWidth,
        borderRadius: AppStyles.border.borderRadius,
        backgroundColor: AppStyles.white,
        marginBottom: 12
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: AppStyles.card.titleSize,
        marginBottom: 4,
        fontWeight: 'bold',
        flex: 1,
        color: AppStyles.mainBlackColor
    },
    address: {
        marginBottom: 4
    },
    rating: {
        alignSelf: 'flex-end',
        marginTop: 12,
    }
})

type Props = {
    site: Site;
}

type StackProps = NativeStackNavigationProp<any, any>;

export const ListCard = ({ site }: Props) => {

    const navigation = useNavigation<StackProps>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("site", { site })} style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{site.nombre}</Text>
                <Icon name='map-marker-alt' size={17} color='red' />
            </View>
            <Text style={styles.address}>{site.direccion}</Text>
            <Text style={styles.rating}>{site.calificacionGoogle}/5 <Icon size={16} name='star' color='#e8e82e' solid style={{ borderWidth: 0.5, borderColor: 'black' }} /></Text>
        </TouchableOpacity>
    );
}