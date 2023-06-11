import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, GestureResponderEvent, Text, } from 'react-native';
import {  } from 'react-native-vector-icons'; 


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 40,
        right: 70,
        zIndex: 1
    },
    button: {
        backgroundColor: '#55F1B1F2',
        borderRadius: 30,
        width: 120,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: '500'
    }
});


interface FloatingButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    text: string;
}

export const FloatingButton: FC<FloatingButtonProps> = ({ onPress, text}: FloatingButtonProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                {/* <Icon name="md-add" size={24} color="white" /> */}
                <Text style={styles.text}>{ text }</Text>
            </TouchableOpacity>
        </View>
    );
};
