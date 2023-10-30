import React, { useState, FC, useEffect, useContext } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Titulo } from "./Titulo";
import MainButton from "./MainButton";
import { AppStyles } from "./Shared/AppStyles";
import { CloseSitesContext, initialFilters } from "./Shared/Context";

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
}

interface CustomCheckboxProps {
    checked: boolean;
    onChange: () => void;
    label: string;
}

const FilterModal: FC<FilterModalProps> = ({ visible, onClose }) => {
    const { applyFilters, appliedFilters } = useContext(CloseSitesContext);

    const [hasPhotos, setHasPhotos] = useState(appliedFilters.hasPhotos);
    const [hasComments, setHasComments] = useState(appliedFilters.hasComments);
    const [hasPhysicalRating, setHasPhysicalRating] = useState(appliedFilters.hasPhysicalRating);
    const [hasSensorialRating, setHasSensorialRating] = useState(appliedFilters.hasSensorialRating);
    const [hasPsychicRating, setHasPsychicRating] = useState(appliedFilters.hasPsychicRating);

    // Actualizar los estados de los checkboxes cuando cambien los filtros aplicados
    useEffect(() => {
        setHasPhotos(appliedFilters.hasPhotos);
        setHasComments(appliedFilters.hasComments);
        setHasPhysicalRating(appliedFilters.hasPhysicalRating);
        setHasSensorialRating(appliedFilters.hasSensorialRating);
        setHasPsychicRating(appliedFilters.hasPsychicRating);
    }, [appliedFilters]);

    const CustomCheckbox = ({ checked, onChange, label }: CustomCheckboxProps) => (
        <TouchableOpacity style={styles.checkboxRow} onPress={onChange}>
            <View style={styles.checkbox}>
                {checked && <View style={styles.checkboxInner} />}
            </View>
            <Text style={styles.checkboxLabel}>{label}</Text>
        </TouchableOpacity>
    );

    const onApplyFilters = () => {
        applyFilters({
            hasPhotos,
            hasComments,
            hasPhysicalRating,
            hasSensorialRating,
            hasPsychicRating
        });
        onClose();
    };

    const onClearFilters = () => {
        applyFilters(initialFilters);
        onClose();
    }

    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={true}
        >
            <View style={styles.centroVista}>
                <View style={styles.modalVista}>
                    <Titulo title='Filtros para sitios cercanos' />

                    <Text style={styles.subtitle}>Debe tener:</Text>
                    <CustomCheckbox
                        checked={hasPhotos}
                        onChange={() => setHasPhotos(!hasPhotos)}
                        label="Fotos"
                    />
                    <CustomCheckbox
                        checked={hasComments}
                        onChange={() => setHasComments(!hasComments)}
                        label="Comentarios"
                    />

                    <Text style={styles.subtitle}>Debe estar valorado en:</Text>
                    <CustomCheckbox
                        checked={hasPhysicalRating}
                        onChange={() => setHasPhysicalRating(!hasPhysicalRating)}
                        label="Física"
                    />
                    <CustomCheckbox
                        checked={hasSensorialRating}
                        onChange={() => setHasSensorialRating(!hasSensorialRating)}
                        label="Sensorial"
                    />
                    <CustomCheckbox
                        checked={hasPsychicRating}
                        onChange={() => setHasPsychicRating(!hasPsychicRating)}
                        label="Psíquica"
                    />

                    <View style={styles.buttonsContainer}>
                        <MainButton
                            title="Limpiar filtros"
                            onPress={onClearFilters}
                            color="white"
                            titleStyle={{ color: AppStyles.mainBlackColor }}
                        />
                        <MainButton
                            title='Aplicar filtros'
                            onPress={onApplyFilters}
                            color={AppStyles.mainBlueColor}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centroVista: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalVista: {
        width: '90%',
        height: '70%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        position: 'absolute',
        bottom: 20,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: AppStyles.mainBlueColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: AppStyles.mainBlueColor
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 18,
        color: AppStyles.mainBlackColor
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    }
});

export default FilterModal;
