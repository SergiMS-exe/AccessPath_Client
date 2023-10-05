import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

type Props = {
    onPress: () => void;
    title: string;
    iconName?: string;
    color?: string;
}

const MainButton = ({ onPress, title, iconName, color = '#007AFF' }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            {iconName && <Icon name={iconName} style={styles.icon} solid />}
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        minWidth: 100,
        marginVertical: 8,
        marginHorizontal: 20,
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 8
    },
    icon: {
        fontSize: 20,
        color: 'white',
    }
});

export default MainButton;