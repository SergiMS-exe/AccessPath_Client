import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    title: String,
    containerStyle?: Object,
    textStyle?: Object
}

export const Titulo = ({ title, containerStyle, textStyle }: Props) => {

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
        },
        text: {
            fontSize: 30,
            textAlign: 'center'
        }
    })

    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
        </View>
    )
}