import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppStyles } from './Shared/AppStyles';

type Props = {
    text: string;
    onSelectionChange: (value: number) => void;
}

export const RadioButtonGroup = ({ text, onSelectionChange }: Props) => {
    const [selected, setSelected] = useState(0);

    const handlePress = (value: number) => {
        setSelected(value);
        if (onSelectionChange) {
            onSelectionChange(value);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.categoria}>{text}</Text>
            <View style={styles.respuestas}>
                {[...Array(5).keys()].map(i => (
                    <TouchableOpacity style={styles.radioButton} key={i + 1} onPress={() => handlePress(i + 1)}>
                        <Text style={styles.respuesta}>{i + 1}</Text>
                        <Icon style={styles.icono} name="dot-circle" solid={selected === i + 1} />
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.radioButton} onPress={() => handlePress(0)}>
                    <Text style={styles.respuesta}>No sé</Text>
                    <Icon style={styles.icono} name="dot-circle" solid={selected === 0} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5', // Light gray
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    radioButton: {
        alignItems: 'center',
        margin: 10,
    },
    categoria: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
    },
    respuestas: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
    },
    respuesta: {
        alignSelf: 'center',
        marginLeft: 5,
        marginRight: 6,
        color: '#333', // Dark gray
    },
    icono: {
        marginTop: 5,
        fontSize: 20,
        color: AppStyles.mainBlueColor, // Blue color
    }
})
