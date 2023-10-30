import { FAB } from "@rneui/themed"
import { Platform, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import FilterModal from "./FilterModal";
import { useState } from "react";


interface Props {
    style?: any;
}

const FilterFAB = ({ style }: Props) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <FAB
                style={[styles.fab, style]}
                icon={<Icon name='filter-alt' size={30} />}
                color='white'
                onPress={() => setShowModal(true)}
            />
            <FilterModal visible={showModal} onClose={() => setShowModal(false)} />

        </>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 10,
        right: 20,
        top: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        shadowColor: "#000",
        backgroundColor: 'white'
    },
    androidFab: {
        right: 50
    }
});

export default FilterFAB;