import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    title: String
}

export const Titulo = ({title}: Props) => {

    const styles = StyleSheet.create({
        titulo : {
            alignContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 25
        },
        text: {
            fontSize: 30,
            textAlign: 'center'
        }
    })

    return (
        <View style={styles.titulo}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}