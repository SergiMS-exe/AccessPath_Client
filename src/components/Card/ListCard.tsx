import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppStyles } from "../Shared/AppStyles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Site } from "../../../@types/Site";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 120,
        padding: 12,
        borderColor: AppStyles.border.borderColor,
        borderWidth: AppStyles.border.borderWidth,
        borderRadius: AppStyles.border.borderRadius,
        backgroundColor: AppStyles.white,
    },
    title: {
        fontSize: AppStyles.card.titleSize,
        marginBottom: 4
    }
})

type Props = {
    site: Site;
}

type StackProps = NativeStackNavigationProp<any, any>;

export const ListCard = ({site}: Props) => {

    const navigation = useNavigation<StackProps>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("search")} style={styles.container}>
            <Text style={styles.title}>{site.nombre}</Text>
            <Text>{site.direccion}</Text>
            <Text>{site.calificacion}/5 <Icon size={16} name='star' color='#e8e82e' solid style={{borderWidth: 0.5, borderColor:'black'}}/></Text>
        </TouchableOpacity>
    );
}