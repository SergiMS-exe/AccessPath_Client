import { SafeAreaView, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Titulo } from "../components/Titulo";
import Icon from "react-native-vector-icons/FontAwesome5";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackHeader } from "../components/Headers/StackHeader";

const data = [
    {
        title: 'Física',
        data: ['Entrada suficiente', 'Rampa']
    },
    {
        title: 'Sensorial',
        data: ['A', 'B', 'C']
    }
]
type StackProps = NativeStackNavigationProp<any, any>;

export const FormScreen = () => {

    const navigation = useNavigation<StackProps>();

    const [selectedValues, setSelectedValues] = useState({});

    const handleSelectionChange = (item: any, value: any) => {
        setSelectedValues(prevState => ({...prevState, [item]: value}));
    }

    useEffect(()=> {
        console.log(selectedValues)
    }, [selectedValues])
    
    const guardarCambios = () => {
        // Código para guardar los cambios
        console.log('Cambios guardados: ', selectedValues);
        navigation.goBack()
    }
    
    return (
        <SafeAreaView style={{

            backgroundColor: '#fff',
        }}>
            <StackHeader />
            <SectionList
                contentContainerStyle={styles.container}
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <RadioButtonGroup text={item} onSelectionChange={(value) => handleSelectionChange(item, value)}/>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
            <TouchableOpacity style={styles.saveButton} onPress={guardarCambios}>
                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 16,
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
    saveButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        alignItems: 'center',
        borderRadius: 4,
        margin: 10,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    }
});