import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
    title: string
    onChangeText: any
}

export const MyInput = ({title, onChangeText}:Props) => {

    const styles = StyleSheet.create({
        container: {
            marginHorizontal: 30,
            marginVertical: 10
        },
        titulo: {
            fontSize: 15,
            marginBottom: 7
        },
        input: {
            borderColor: 'black',
            borderWidth: 1
        }
    })

    const isPassword = title.toLowerCase().includes('contraseña')

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{title}</Text>
            <TextInput style={styles.input} onChange={onChangeText}/>
        </View>
    )
}