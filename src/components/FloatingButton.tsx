import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, GestureResponderEvent, Text } from 'react-native';
import {  } from 'react-native-vector-icons'; 


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    button: {
        backgroundColor: '#ff0000',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


interface FloatingButtonProps {
    onPress: (event: GestureResponderEvent) => void;
}

export const FloatingButton: FC<FloatingButtonProps> = ({ onPress }: FloatingButtonProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                {/* <Icon name="md-add" size={24} color="white" /> */}
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    );
};
