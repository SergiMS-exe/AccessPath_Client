import { SafeAreaView, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { useContext, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackHeader } from "../components/Headers/StackHeader";
import { sendRating } from "../services/PlacesServices";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FisicaEnum, SensorialEnum, PsiquicaEnum, Valoracion, FisicaKey, SensorialKey, PsiquicaKey } from '../../@types/Valoracion';
import { Site } from "../../@types/Site";
import { LoginContext } from "../components/Shared/Context";

const data = [
    {
        title: 'Física',
        data: Object.values(FisicaEnum) as string[]
    },
    {
        title: 'Sensorial',
        data: Object.values(SensorialEnum) as string[]
    },
    {
        title: 'Psíquica',
        data: Object.values(PsiquicaEnum) as string[]
    }
]

type StackProps = NativeStackNavigationProp<any, any>;

type RootStackParamList = {
    site: { site: Site };
};

type SiteScreenRouteProp = RouteProp<RootStackParamList, "site">;

export const FormScreen = () => {
    const route = useRoute<SiteScreenRouteProp>();

    const { user } = useContext(LoginContext);
    let { site } = route.params;

    const navigation = useNavigation<StackProps>();

    const [selectedValues, setSelectedValues] = useState<Valoracion>({} as Valoracion);
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

    type Ternary = FisicaKey | SensorialKey | PsiquicaKey;

    const handleSelectionChange = (type: "fisica" | "sensorial" | "psiquica", property: Ternary, value: number) => {
        let newValoracion: Valoracion = { ...selectedValues };  // Haciendo una copia superficial para no mutar el objeto original
        if (value === 0) {
            if (newValoracion[type]) {
                // @ts-ignore
                delete newValoracion[type][property];

                // @ts-ignore
                if (Object.keys(newValoracion[type]).length === 0)
                    delete newValoracion[type];
            }
        } else {
            if (!newValoracion[type])
                newValoracion[type] = {} as Record<Ternary, number>;
            (newValoracion[type] as Record<Ternary, number>)[property] = value;
        }

        setSelectedValues(newValoracion);
    }


    type EnumType = typeof FisicaEnum | typeof SensorialEnum | typeof PsiquicaEnum;

    const titleToType = (title: string): { type: "fisica" | "sensorial" | "psiquica", correspondingEnum: EnumType } | null => {
        switch (title) {
            case 'Física':
                return { type: "fisica", correspondingEnum: FisicaEnum };
            case 'Sensorial':
                return { type: "sensorial", correspondingEnum: SensorialEnum };
            case 'Psíquica':
                return { type: "psiquica", correspondingEnum: PsiquicaEnum };
            default:
                return null;
        }
    };

    const processSelectionChange = (type: string, property: string, value: number) => {
        const conversionResult = titleToType(type);
        if (!conversionResult) {
            console.error(`Tipo no válido: ${type}`);
            return;
        }

        const enumKey = getKeyFromEnumValue(property, conversionResult.correspondingEnum);
        if (!enumKey) {
            console.error(`Propiedad no válida: ${property}`);
            return;
        }

        handleSelectionChange(conversionResult.type, enumKey, value);
    }

    function getKeyFromEnumValue<T>(value: string, enumObject: T): keyof T | null {
        for (let key in enumObject) {
            if (enumObject[key] === value) {
                return key as keyof T;
            }
        }
        return null;
    }


    useEffect(() => {
        console.log(selectedValues)
    }, [selectedValues])

    const saveChanges = () => {
        if (Object.keys(selectedValues).length === 0)
            setHasError(true);
        else {
            // Código para guardar los cambios
            console.log('Changes saved: ', selectedValues);
            site.nombre = "(Rated)";
            navigation.setParams({ site: site });
            navigation.goBack();
        }
    }

    const saveChangesAsync = async () => {
        if (Object.keys(selectedValues).length === 0)
            setHasError(true);
        else {
            const response = await sendRating(selectedValues, site, user!._id);
            if (response.success && "newPlace" in response) {
                response.newPlace.nombre = "(Rated)";
                console.log("Nombre en form: " + response.newPlace.nombre);
                navigation.navigate({
                    name: 'site',
                    params: { site: response.newPlace },
                    merge: true,
                });
            }
            else
                console.log(response.message)
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
                            onSelectionChange={(value) => processSelectionChange(section.title, item, value)}
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
            <TouchableOpacity style={styles.saveButton} onPress={saveChangesAsync}>
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