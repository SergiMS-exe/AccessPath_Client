import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

type Props = {
    onPress: () => void;
    title: string;
    iconName?: string;
    color?: string;
    titleStyle?: Object;
    containerStyle?: Object;
    loading?: boolean;
}

const MainButton = ({ onPress, title, iconName, color = '#007AFF', titleStyle, containerStyle, loading = false }: Props) => {
    return (
        <TouchableOpacity accessible accessibilityRole='button' accessibilityHint={title} accessibilityLabel={title}
            style={{ ...styles.button, backgroundColor: color, ...containerStyle }} onPress={onPress}
            disabled={loading === true}>
            {loading ?
                <ActivityIndicator size="small" color="white" /> :
                (
                    <>
                        {iconName && <Icon name={iconName} style={styles.icon} solid />}
                        <Text style={{ ...styles.buttonText, ...titleStyle }}>{title}</Text>
                    </>
                )
            }
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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    icon: {
        fontSize: 20,
        marginRight: 7,
        color: 'white',
    }
});

export default MainButton;