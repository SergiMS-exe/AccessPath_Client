import React, {forwardRef, useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    title: string
    onChangeText: any
    onKeyPress?: (event: any) => void
}

export const MyInput = forwardRef<TextInput, Props>(({title, onChangeText, onKeyPress}, ref) => {

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
        },
        passwordContainer: {
            flexDirection: 'row', 
            borderWidth: 1, 
            borderColor: '#000', 
            alignItems: 'center'
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
                        style={{flex: 1}} 
                        secureTextEntry={hidePassword}
                        onChangeText={onChangeText} 
                        autoCapitalize='none'
                        onKeyPress={onKeyPress}
                        ref={ref}
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
                />
            )}
        </View>
    )
});
