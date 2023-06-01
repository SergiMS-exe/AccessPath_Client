import { StyleSheet, Text, View } from "react-native";
import { AppStyles } from "../Shared/AppStyles";

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

export const SearchCard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Titulo Titulo Titulo</Text>
            <Text>Subtitle Subtitle Subtitle </Text>
        </View>
    );
}