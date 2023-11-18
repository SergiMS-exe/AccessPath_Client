import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { AppStyles } from "./Shared/AppStyles";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Site } from "../../@types/Site";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Valoracion } from "../../@types/Valoracion";
import { deleteRating } from "../services/PlacesServices";
import Snackbar from "react-native-snackbar";
import { useContext, useEffect } from "react";
import { CloseSitesContext, LoginContext, MySitesContext } from "./Shared/Context";

type Props = {
    site: Site;
    valoracion?: Valoracion;
    isAbsolute?: boolean;
    onRatingDeleted?: (newPlace: Site) => void;
    calledFrom: 'myRatings' | 'site';
};

type StackProps = NativeStackNavigationProp<any, any>;

export const AddEditRating = ({ valoracion, site, isAbsolute = false, onRatingDeleted, calledFrom }: Props) => {
    const navigation = useNavigation<StackProps>();

    const { myRatings, setMyRatings } = useContext(MySitesContext);
    const { setSites, sites } = useContext(CloseSitesContext);
    const { user } = useContext(LoginContext);

    const handleDelete = () => {
        if (valoracion) {
            Alert.alert(
                "Eliminar valoración",
                "¿Estás seguro de que quieres eliminar esta valoración?",
                [
                    {
                        text: "Cancelar",
                        style: "cancel"
                    },
                    {
                        text: "Eliminar",
                        onPress: async () => {
                            if (!user) {
                                Snackbar.show({
                                    text: 'Debes iniciar sesión para eliminar una valoración',
                                    duration: Snackbar.LENGTH_LONG,
                                    backgroundColor: 'red',
                                });
                                return;
                            }
                            const response = await deleteRating(site.placeId, user._id);
                            if (!response.success) {
                                Snackbar.show({
                                    text: response.message,
                                    duration: Snackbar.LENGTH_LONG,
                                    backgroundColor: 'red',
                                });
                            } else {
                                // Remove the deleted rating from the list using userId and placeId
                                const newRatings = myRatings.filter(rating => rating.valoracion.userId !== valoracion.userId || rating.valoracion.placeId !== valoracion.placeId);
                                setMyRatings(newRatings);
                                if ('newPlace' in response && onRatingDeleted) {
                                    site.valoraciones = response.newPlace.valoraciones;
                                    const newSites = sites.map(s => s.placeId === site.placeId ? site : s);
                                    setSites(newSites);
                                    onRatingDeleted({ ...response.newPlace });
                                }
                            }

                        }
                    }
                ]
            );
        }
    };

    return (
        <View style={[styles.container, isAbsolute ? styles.absolutePosition : styles.relativePosition]}>
            {valoracion ? (
                <>
                    <TouchableOpacity
                        accessible accessibilityRole='button' accessibilityHint='Editar Valoración'
                        onPress={() => navigation.navigate('form', { site, valoracion, calledFrom })}
                        style={[styles.aButton, styles.editButton]}>
                        <Text style={styles.text}>Editar Valoración</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessible accessibilityRole='button' accessibilityHint='Eliminar Valoración'
                        onPress={handleDelete}
                        style={[styles.aButton, styles.deleteButton]}>
                        <Icon name="trash" size={18} color='white' />
                    </TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity
                    accessible accessibilityRole='button' accessibilityHint='Añadir Valoración'
                    style={[styles.aButton, styles.addButton]}
                    onPress={() => navigation.navigate('form', { site, calledFrom })}>
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