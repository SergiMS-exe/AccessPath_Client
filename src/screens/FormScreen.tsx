import { SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { useContext, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackHeader } from "../components/Headers/StackHeader";
import { editRating, sendRating } from "../services/PlacesServices";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FisicaEnum, SensorialEnum, PsiquicaEnum, Valoracion, FisicaKey, SensorialKey, PsiquicaKey } from '../../@types/Valoracion';
import { Site } from "../../@types/Site";
import { LoginContext, MySitesContext } from "../components/Shared/Context";
import Snackbar from "react-native-snackbar";

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
    site: { site: Site, valoracion?: Valoracion, calledFrom: 'myRatings' | 'site' };
};

type SiteScreenRouteProp = RouteProp<RootStackParamList, "site">;

export const FormScreen = () => {
    const route = useRoute<SiteScreenRouteProp>();

    const { user } = useContext(LoginContext);
    const { myRatings, setMyRatings } = useContext(MySitesContext)

    let { site, valoracion, calledFrom } = route.params;

    const navigation = useNavigation<StackProps>();

    const [selectedValues, setSelectedValues] = useState<Valoracion>(
        valoracion || {} as Valoracion
    );
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

    const getInitialValue = (sectionTitle: string, item: string) => {
        const conversionResult = titleToType(sectionTitle);
        if (!conversionResult) {
            return 0;
        }
        const enumKey = getKeyFromEnumValue(item, conversionResult.correspondingEnum);
        if (!enumKey) {
            return 0;
        }
        const value = selectedValues[conversionResult.type]?.[enumKey];
        return value || 0;
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


    const saveChangesAsync = async () => {
        if (Object.keys(selectedValues).length === 0) {
            Snackbar.show({ text: 'Se debe valorar algún campo antes de enviar', duration: Snackbar.LENGTH_LONG, backgroundColor: 'red' });
            return;
        }

        const response = valoracion
            ? await editRating(selectedValues, site.placeId, user!._id)
            : await sendRating(selectedValues, site, user!._id);

        if (!response.success || !("newPlace" in response)) {
            Snackbar.show({ text: response.message, duration: Snackbar.LENGTH_LONG, backgroundColor: 'red' });
            return;
        }

        const newSite = { ...response.newPlace };
        let newRatings = [...myRatings];

        if (valoracion) {
            const index = newRatings.findIndex(rating => rating.site.placeId === site.placeId);
            if (index !== -1) newRatings[index] = { site: newSite, valoracion: selectedValues };
        } else {
            newRatings.push({ site: newSite, valoracion: selectedValues });
        }

        setMyRatings(newRatings);
        if (calledFrom === 'site') {
            navigation.navigate('site', { site: newSite });
        } else {
            navigation.navigate('myRatings');
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
                        <RadioButtonGroup
                            text={item}
                            initialValue={getInitialValue(section.title, item)}
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