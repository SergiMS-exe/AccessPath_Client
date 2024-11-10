import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from '@rneui/themed';
import {
    FisicaEnum,
    SensorialEnum,
    PsiquicaEnum,
    TypesOfDisabilities,
    Valoracion,
    reverseSensorialEnum,
    reverseFisicaEnum,
    reversePsiquicaEnum,
} from '../../@types/Valoracion';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppStyles } from './Shared/AppStyles';
import { useRatings } from '../hooks/useRatings';

type Props = {
    media: Valoracion | undefined;
}

const DropDownAverages = ({ media }: Props) => {

    const { getDisabilitiesIcon, getMainCategoryRating } = useRatings();

    const categories = [
        {
            mainCategory: TypesOfDisabilities.fisica,
            subCategories: Object.values(FisicaEnum),
            icon: getDisabilitiesIcon(TypesOfDisabilities.fisica),
        },
        {
            mainCategory: TypesOfDisabilities.sensorial,
            subCategories: Object.values(SensorialEnum),
            icon: getDisabilitiesIcon(TypesOfDisabilities.sensorial),
        },
        {
            mainCategory: TypesOfDisabilities.psiquica,
            subCategories: Object.values(PsiquicaEnum),
            icon: getDisabilitiesIcon(TypesOfDisabilities.psiquica),
        },
    ];

    const [expanded, setExpanded] = useState<string | false>(false);


    const getSubCategoryRating = (mainCategoryKey: string, subCategoryValue: string): number | null => {
        if (media) {
            const categoryData = media[mainCategoryKey as keyof Valoracion] as any;
            let subCategoryKey;
            switch (mainCategoryKey) {
                case 'fisica':
                    subCategoryKey = reverseFisicaEnum[subCategoryValue];
                    break;
                case 'sensorial':
                    subCategoryKey = reverseSensorialEnum[subCategoryValue];
                    break;
                case 'psiquica':
                    subCategoryKey = reversePsiquicaEnum[subCategoryValue];
                    break;
            }
            if (categoryData && categoryData.valoracion && subCategoryKey && categoryData.valoracion[subCategoryKey]) {
                return categoryData.valoracion[subCategoryKey];
            }
        }
        return null;
    }

    function normalizeKey(str: string): string {
        return str.toLowerCase().replace(/í/g, "i");
    }

    return (
        <View style={styles.container}>
            {media ? categories.map((category) => {
                const mainCategoryKey = normalizeKey(category.mainCategory);
                const mainCategoryRating = getMainCategoryRating(mainCategoryKey, media);

                return mainCategoryRating !== null ? (
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
                                <Text style={styles.ratingText}>{mainCategoryRating}</Text>
                            </>
                        }
                        isExpanded={expanded === category.mainCategory}
                        onPress={() => {
                            setExpanded(
                                expanded === category.mainCategory ? false : category.mainCategory
                            );
                        }}
                    >
                        {category.subCategories.map((subCategory, i) => {
                            const subCategoryRating = getSubCategoryRating(mainCategoryKey, subCategory as any);
                            return subCategoryRating !== null ? (
                                <ListItem key={i} topDivider>
                                    <ListItem.Content>
                                        <ListItem.Title>{subCategory}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Content right>
                                        <Text style={styles.ratingText}>{subCategoryRating}</Text>
                                    </ListItem.Content>
                                </ListItem>
                            ) : null;
                        })}

                    </ListItem.Accordion>
                ) : null
            }) : (
                <Text style={styles.emptyText}>No hay valoraciones para este sitio. ¡Añada una!</Text>
            )}
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
        padding: 8,
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
        color: AppStyles.mainBlackColor,
        marginRight: 10,
    },
    ratingText: {
        marginRight: 10,
        fontSize: 16,
        color: '#333'
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '500',
        color: AppStyles.secondaryBlackColor,
        paddingBottom: 10,
        textAlign: 'center'
    },
});

export default DropDownAverages;
