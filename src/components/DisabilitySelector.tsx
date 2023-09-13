import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface DropdownItem {
    label: string;
    value: string;
}

type Props = {
    value?: "Ninguna" | "Física" | "Sensorial" | "Psíquica";
    onChange?: (value: "Ninguna" | "Física" | "Sensorial" | "Psíquica") => void;
}


const DisabilitySelector = ({ value, onChange }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState(value || 'Ninguna');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tipo de discapacidad</Text>
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                items={[
                    { label: 'Física', value: 'Física' },
                    { label: 'Sensorial', value: 'Sensorial' },
                    { label: 'Psíquica', value: 'Psíquica' },
                    { label: 'Ninguna', value: 'Ninguna' }
                ]}
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
                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginVertical: 10
    },
    title: {
        fontSize: 15,
        marginBottom: 7
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
