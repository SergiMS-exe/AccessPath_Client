import { StyleSheet, Text, View } from "react-native";
import { AppStyles } from "../Shared/AppStyles";
import Icon from "react-native-vector-icons/FontAwesome5";

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
    name: string;
    address: string;
    rating: number;
}

export const SearchCard = ({name, address, rating}: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Text>{address}</Text>
            <Text>{rating}/5 <Icon size={16} name='star' color='#e8e82e' solid style={{borderWidth: 0.5, borderColor:'black'}}/></Text>
        </View>
    );
}