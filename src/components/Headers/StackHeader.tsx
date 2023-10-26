import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
    title?: string;
    iconRight?: string;
    onPressRight?: () => void;
    onPressLeft?: () => void;
}

export const StackHeader = ({ title, iconRight, onPressRight, onPressLeft }: Props) => {

    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onPressLeft ? onPressLeft : () => navigation.goBack()}>
                <Icon name='arrow-left' size={40} color='#121212' />
            </TouchableOpacity>

            {title ? (
                <Text style={styles.titleText}>{title}</Text>
            ) : (
                <View style={styles.blank} />
            )}
            {(iconRight && onPressRight) &&
                <TouchableOpacity onPress={onPressRight}>
                    <Icon name={iconRight} size={30} style={{ marginRight: 20 }} />
                </TouchableOpacity>
            }
        </View>
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
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
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