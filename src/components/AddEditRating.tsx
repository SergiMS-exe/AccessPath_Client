import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AppStyles } from "./Shared/AppStyles";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Site } from "../../@types/Site";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type Props = {
    site: Site;
    isEditing: boolean;
    isAbsolute?: boolean;
};

type StackProps = NativeStackNavigationProp<any, any>;

export const AddEditRating = ({ isEditing, site, isAbsolute = false }: Props) => {
    const navigation = useNavigation<StackProps>();

    return (
        <View style={[styles.container, isAbsolute ? styles.absolutePosition : styles.relativePosition]}>
            {isEditing ? (
                <>
                    <View style={[styles.aButton, styles.editButton]}>
                        <Text style={styles.text}>Editar Valoración</Text>
                    </View>
                    <View style={[styles.aButton, styles.deleteButton]}>
                        <Icon name="trash" size={18} color='white' />
                    </View>
                </>
            ) : (
                <TouchableOpacity
                    style={[styles.aButton, styles.addButton]}
                    onPress={() => navigation.navigate('form', { site })}>
                    <Text style={styles.text}>Añadir Valoración</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        zIndex: 1,

    },
    absolutePosition: {
        position: 'absolute',
        bottom: "5%",
        left: "4%",
        width: '92%',
    },
    relativePosition: {
        marginTop: 10,
        alignSelf: 'center',
        width: '100%',
    },
    aButton: {
        borderRadius: 30,
        opacity: 0.8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // Sombra en iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Sombra en Android
        elevation: 5,
    },
    addButton: {
        backgroundColor: AppStyles.mainBlueColor,
        width: "100%",
    },
    editButton: {
        backgroundColor: AppStyles.mainBlueColor,
        width: "80%",
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: 'red',
        width: "20%",
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
});