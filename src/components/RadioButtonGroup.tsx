import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppStyles } from './Shared/AppStyles';

type Props = {
    text: string;
    onSelectionChange: (value: number) => void;
    initialValue?: number;
};

export const RadioButtonGroup = ({ text, onSelectionChange, initialValue = 0 }: Props) => {
    const [selected, setSelected] = useState(initialValue);

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
                    <Text style={{ ...styles.respuesta, fontSize: 16 }}>Ns/Nc</Text>
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
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    categoria: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        color: AppStyles.mainBlackColor,
        paddingRight: 10,
    },
    respuestas: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //flex: 1,
        width: '60%'
    },
    respuesta: {
        alignSelf: 'center',
        marginLeft: 5,
        marginRight: 6,
        color: AppStyles.mainBlackColor,
        fontSize: 18
    },
    icono: {
        marginTop: 5,
        fontSize: 22,
        color: AppStyles.mainBlueColor, // Blue color
    }
})
