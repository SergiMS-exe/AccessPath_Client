import React, { forwardRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    title: string;
    onChangeText?: (text: string) => void;
    onKeyPress?: (event: any) => void;
    value?: string;  
    marginHorizontal?: number;
}

export const MyInput = forwardRef<TextInput, Props>(({ title, onChangeText, onKeyPress, value, marginHorizontal = 30 }, ref) => {

    const styles = StyleSheet.create({
        container: {
            marginHorizontal: marginHorizontal,
            marginVertical: 10
        },
        titulo: {
            fontSize: 15,
            marginBottom: 7
        },
        input: {
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            fontSize: 16,
            backgroundColor: '#fff'
        },
        passwordContainer: {
            flexDirection: 'row',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 10,
            alignItems: 'center',
            padding: 10
        }
    })

    const [hidePassword, setHidePassword] = useState(true);
    const handleHidePassword = () => {
        setHidePassword(!hidePassword)
    }

    const isPassword = title.toLowerCase().includes('contraseña')

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{title}</Text>
            {isPassword ? (
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={{ flex: 1, ...styles.input}}
                        secureTextEntry={hidePassword}
                        onChangeText={onChangeText}
                        autoCapitalize='none'
                        onKeyPress={onKeyPress}
                        ref={ref}
                        value={value}  // Usar el valor de la prop "value" aquí
                    />
                    <TouchableOpacity onPress={handleHidePassword} style={{ paddingHorizontal: 10 }}>
                        {hidePassword ? (
                            <Icon name="eye-slash" size={20} color="#000" />
                        ) : (
                            <Icon name="eye" size={20} color="#000" />
                        )}
                    </TouchableOpacity>
                </View>
            ) : (
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    autoCapitalize='none'
                    onKeyPress={onKeyPress}
                    ref={ref}
                    value={value}  // Usar el valor de la prop "value" aquí
                />
            )}
        </View>
    )
});
