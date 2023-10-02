import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from '@rneui/themed';
import {
    FisicaEnum,
    SensorialEnum,
    PsiquicaEnum,
    TypesOfDisabilities,
} from '../../@types/Valoracion';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { List } from 'react-native-paper';
import { Rating } from '@rneui/base';

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
                <ListItem.Accordion
                    key={category.mainCategory}
                    content={
                        <>
                            <Icon name={category.icon} size={25} style={styles.icon} />
                            <ListItem.Content style={{ flex: 1 }}>
                                <ListItem.Title style={{ fontWeight: 'bold', fontSize: 18 }}>
                                    {category.mainCategory}
                                </ListItem.Title>
                            </ListItem.Content>
                            <Text style={styles.ratingText}>4/5</Text>
                        </>
                    }
                    isExpanded={expanded === category.mainCategory}
                    onPress={() => {
                        setExpanded(
                            expanded === category.mainCategory ? false : category.mainCategory
                        );
                    }}
                >
                    {category.subCategories.map((subCategory, i) => (
                        <ListItem key={i} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{subCategory}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content right>
                                <Text style={styles.ratingText}>4/5</Text>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ListItem.Accordion>
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
        marginRight: 10,
    },
    ratingText: {
        marginRight: 10,
        fontSize: 16,
        color: '#333'
    },
});

export default DropDownAverages
