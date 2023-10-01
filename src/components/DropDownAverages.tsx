import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import {
    FisicaEnum,
    SensorialEnum,
    PsiquicaEnum,
    TypesOfDisabilities,
} from '../../@types/Valoracion';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DropDownAverages = () => {

    const categories = [
        {
            mainCategory: TypesOfDisabilities.fisica,
            subCategories: Object.values(FisicaEnum),
            icon: 'wheelchair',
        },
        {
            mainCategory: TypesOfDisabilities.sensorial,
            subCategories: Object.values(SensorialEnum),
            icon: 'deaf',
        },
        {
            mainCategory: TypesOfDisabilities.psiquica,
            subCategories: Object.values(PsiquicaEnum),
            icon: 'brain',
        },
    ];

    const [expanded, setExpanded] = useState<string | false>(false);

    return (
        <View style={styles.container}>
            {categories.map((category) => (
                <View style={styles.categoryContainer} key={category.mainCategory}>
                    <List.Accordion
                        title={category.mainCategory}
                        expanded={expanded === category.mainCategory}
                        onPress={() =>
                            setExpanded(
                                expanded === category.mainCategory ? false : category.mainCategory
                            )
                        }
                        titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
                        style={styles.accordion}
                        left={() => <Icon name={category.icon} size={20} style={styles.icon} />}
                        id={category.mainCategory}
                    >
                        {category.subCategories.map((subCategory) => (
                            <List.Item key={subCategory} title={subCategory} />
                        ))}
                    </List.Accordion>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#fff',
    },
    categoryContainer: {
        //marginBottom: 16,
    },
    accordion: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 10,
    },
    icon: {
        padding: 10,
        marginLeft: 5
    }
});

export default DropDownAverages
