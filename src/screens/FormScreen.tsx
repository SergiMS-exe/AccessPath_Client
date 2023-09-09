import { SafeAreaView, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackHeader } from "../components/Headers/StackHeader";
import { sendRating } from "../services/PlacesServices";
import { RatingForm } from "../../@types/RatingForm";
import Icon from 'react-native-vector-icons/FontAwesome5';

const data = [
    {
        title: 'Física',
        data: [
            'Entradas/Salidas',
            'Rampas',
            'Ascensores',
            'Pasillos',
            'Baños Adaptados',
            'Señalética Clara'
        ]
    },
    {
        title: 'Sensorial',
        data: [
            'Señalización Braille',
            'Sistemas de Amplificación',
            'Iluminación Adecuada',
            'Información Accesible',
            'Pictogramas Claros'
        ]
    },
    {
        title: 'Psíquica',
        data: [
            'Información Simple',
            'Señalización Intuitiva',
            'Espacios Tranquilos',
            'Interacción del Personal'
        ]
    }
]

type StackProps = NativeStackNavigationProp<any, any>;

export const FormScreen = () => {

    const navigation = useNavigation<StackProps>();

    const [selectedValues, setSelectedValues] = useState<RatingForm>({});
    const [hasError, setHasError] = useState(false);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);

    const toggleSection = (sectionTitle: string) => {
        setExpandedSections(prevSections => {
            if (prevSections.includes(sectionTitle)) {
                return prevSections.filter(title => title !== sectionTitle);
            } else {
                return [...prevSections, sectionTitle];
            }
        });
    };


    const handleSelectionChange = (section: string, item: string, value: number) => {
        setSelectedValues(prevState => {
            let sectionValues = prevState[section.toLowerCase()] || [];
            let itemIndex = sectionValues.findIndex((sv) => sv[item]);

            if (value === 0) { //Remove item if value is 0
                sectionValues = sectionValues.filter((sv, index) => index !== itemIndex);
                if (sectionValues.length === 0) {
                    const { [section.toLowerCase()]: _, ...rest } = prevState;
                    return rest;
                }
            } else {
                let newItem = { [item]: value };
                setHasError(false)
                if (itemIndex >= 0) {
                    sectionValues[itemIndex] = newItem;  // replace existing item
                } else {
                    sectionValues.push(newItem);  // add new item
                }
            }

            return { ...prevState, [section.toLowerCase()]: sectionValues };
        });
    }

    useEffect(() => {
        console.log(selectedValues)
    }, [selectedValues])

    const guardarCambios = () => {
        if (Object.keys(selectedValues).length === 0)
            setHasError(true);
        else {
            // Código para guardar los cambios
            console.log('Cambios guardados: ', selectedValues);
            navigation.goBack()
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StackHeader />
            <SectionList
                contentContainerStyle={styles.container}
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ section, item }) => (
                    expandedSections.includes(section.title) ? (
                        <RadioButtonGroup text={item}
                            onSelectionChange={(value) => handleSelectionChange(section.title, item, value)}
                        />
                    ) : null
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection(title)}>
                        <Text style={styles.header}>{title}</Text>
                        <Icon 
                            size={24}
                            style={styles.iconStyle} 
                            name={expandedSections.includes(title) ? 'chevron-up' : 'chevron-down'} />
                    </TouchableOpacity>
                )}
                stickySectionHeadersEnabled={false}
            />
            {hasError && <Text style={styles.errorMessage}>Se debe valorar algún campo antes de enviar</Text>}
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        padding: 10, 
        backgroundColor: '#fff',
    },

    iconStyle: {
        marginLeft: 10,
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
    },
    errorMessage: {
        position: 'relative',
        alignSelf: 'center',
        color: 'red',
        fontSize: 16
    }
});