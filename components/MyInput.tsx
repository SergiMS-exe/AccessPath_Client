import React, {useState} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';

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
    
    const [hidePassword, setHidePassword] = useState(true);
    const isPassword = title.toLowerCase().includes('contraseña')

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{title}</Text>
            {isPassword? (
                <TextInput style={styles.input} secureTextEntry={hidePassword}
                    onChangeText={onChangeText} autoCapitalize='none'
                    right={<TextInput.Icon icon={hidePassword ? "eye" : "eye-off"} onPress={() => setHidePassword(!hidePassword)} />}
                    />        
            ): (
                <TextInput style={styles.input} autoCapitalize='none' onChangeText={onChangeText}/>
            )}
            
        </View>
    )
}