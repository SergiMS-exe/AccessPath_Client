import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Animated, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Person from '../../@types/Person';
import { Site } from '../../@types/Site';
import { sendComment } from '../services/PlacesServices';
import { useLoading } from '../hooks/useLoading';

type Props = {
    user: Person,
    site: Site;
    onCommentSent: (newComment: any) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export const CommentsInput: React.FC<Props> = ({ user, site, onCommentSent, onFocus, onBlur }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [height, setHeight] = useState(50);
    const [commentText, setCommentText] = useState('')
    const animatedValue = useRef(new Animated.Value(0)).current;

    const { isLoading, loading, stopLoading } = useLoading();

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
        if (text.length <= 0 && isFocused)
            handleBlur();
        else if (text.length > 0)
            handleFocus()
        setCommentText(text);
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

    const sendCommentAndClear = async () => {
        loading();
        Keyboard.dismiss();
        const newComment = await sendComment(user, site, commentText);
        stopLoading();
        setCommentText("");
        onCommentSent({ '_id': newComment._id, 'texto': newComment.texto, 'usuario': { '_id': newComment.usuario?._id, 'nombre': newComment.usuario?.nombre, 'apellidos': newComment.usuario?.apellidos } });
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.sendButtonContainer, sendButtonContainerStyle]}>
                <TouchableOpacity style={styles.sendButton} onPress={sendCommentAndClear} disabled={isLoading}>
                    {
                        isLoading ?
                            <ActivityIndicator color="white" size='small' /> :
                            <Icon name="paper-plane" style={styles.sendButtonIcon} />}
                </TouchableOpacity>
            </Animated.View>

            <TextInput
                style={[styles.textInput, { height: Math.max(50, height) }]}
                multiline
                onContentSizeChange={handleContentSizeChange}
                blurOnSubmit
                onChangeText={(text) => handleChangeText(text)}
                placeholder="Escriba un comentario..."
                onFocus={() => { onFocus && onFocus() }}
                onBlur={() => { onBlur && onBlur() }}
                value={commentText}
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