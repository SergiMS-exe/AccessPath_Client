import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TypesOfDisabilities, TypesOfDisabilitiesValue } from '../../@types/Valoracion';
import { AppStyles } from './Shared/AppStyles';

type Props = {
    value?: TypesOfDisabilitiesValue;
    onChange?: (value: TypesOfDisabilitiesValue) => void;
}

const DisabilitySelector = ({ value, onChange }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState(value || TypesOfDisabilities.ninguna);

    const disabilityOptions = Object.values(TypesOfDisabilities).map(option => ({
        label: option,
        value: option,
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tipo de discapacidad</Text>
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                items={disabilityOptions}
                value={selectedValue}
                setValue={setSelectedValue}
                dropDownContainerStyle={styles.dropDownContainer}
                labelStyle={styles.dropdownItem}
                itemSeparator={true}
                itemSeparatorStyle={styles.itemSeparator}
                style={styles.dropdownStyle}
                showArrowIcon={true}
                onSelectItem={item => {
                    setSelectedValue(item.value as any);
                    onChange && onChange(item.value as any);
                }}
                listItemLabelStyle={{ fontSize: 16 }}
                listMode="SCROLLVIEW"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginVertical: 10,
        zIndex: 1,
    },
    title: {
        fontSize: 16,
        marginBottom: 7,
        color: AppStyles.mainBlackColor,
    },
    pickerContainer: {
        height: 60,
        width: '100%',
    },
    dropdownStyle: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
    },
    dropdownItem: {
        justifyContent: 'flex-start',
        fontSize: 16,
    },
    dropDownContainer: {
        borderColor: '#ccc',
    },
    itemSeparator: {
        backgroundColor: '#ccc',
        height: 1
    }
});

export default DisabilitySelector;
