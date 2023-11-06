import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyles } from './Shared/AppStyles';

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
            textAlign: 'center',
            color: AppStyles.mainBlackColor,
            fontWeight: 'bold',
        }
    })

    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
        </View>
    )
}