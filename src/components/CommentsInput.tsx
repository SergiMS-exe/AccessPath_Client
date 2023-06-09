import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const CommentsInput: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [height, setHeight] = useState(50);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleChangeText = (text: string) => {
        if (text.length<=0 && isFocused)
            handleBlur();
        else if (text.length>0)
            handleFocus()
    }

    const handleContentSizeChange = (event: any) => {
        setHeight(event.nativeEvent.contentSize.height);
    }

    const sendButtonContainerStyle = {
        opacity: animatedValue,
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                }),
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.sendButtonContainer, sendButtonContainerStyle]}>
                <TouchableOpacity style={styles.sendButton} onPress={() => { console.log("enviando comentario...")}}>
                    <Icon name="paper-plane" style={styles.sendButtonIcon} />
                </TouchableOpacity>
            </Animated.View>
            <TextInput
                style={[styles.textInput, {height: Math.max(50, height)}]}
                multiline
                onContentSizeChange={handleContentSizeChange}
                blurOnSubmit
                onChangeText={(text)=>handleChangeText(text)}
                placeholder="Escriba un comentario..."
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 10,
        paddingVertical: 5
    },
    textInput: {
        height: 50,
        paddingLeft: 10,
        marginRight: 67,
        fontSize: 17
    },
    sendButtonContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        marginRight: 10,
        marginVertical: 10,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    sendButtonIcon: {
        fontSize: 20,
        color: 'white',
    },
});