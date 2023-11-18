import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppStyles } from "../Shared/AppStyles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Site } from "../../../@types/Site";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RatingsInCard from "./RatingsInCard";
import GoogleRating from "./GoogleRating";
import { usePhotos } from "../../hooks/usePhotos";
import { useContext, useEffect, useState } from "react";
import { CloseSitesContext } from "../Shared/Context";

type Props = {
    site: Site;
}

type StackProps = NativeStackNavigationProp<any, any>;

export const ListCard = ({ site }: Props) => {

    const { sites } = useContext(CloseSitesContext);

    const navigation = useNavigation<StackProps>();

    const [siteToShow, setSiteToShow] = useState<Site>(site);

    const imageUris = usePhotos(siteToShow.fotos);

    useFocusEffect(() => {
        const siteFound = sites.find(s => s.placeId === site.placeId);
        if (siteFound)
            setSiteToShow(siteFound);
    })

    return (
        <TouchableOpacity onPress={() => navigation.navigate("site", { site: siteToShow })} style={styles.container}
            accessible accessibilityHint={"Ver detalles de " + site.nombre + " en " + site.direccion} accessibilityRole="button"
            accessibilityLabel={site.nombre}>
            {imageUris.length > 0 && <Image source={{ uri: imageUris[0] }} style={styles.image} />}
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{siteToShow.nombre}</Text>
                <Icon name='map-marker-alt' size={17} color='red' />
            </View>
            <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">{siteToShow.direccion}</Text>
            <View style={styles.footer}>
                <RatingsInCard media={siteToShow.valoraciones} />
                <GoogleRating googleRating={siteToShow.calificacionGoogle} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 12,
        borderColor: AppStyles.border.borderColor,
        borderWidth: AppStyles.border.borderWidth,
        borderRadius: AppStyles.border.borderRadius,
        backgroundColor: AppStyles.white,
        marginBottom: 12,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: AppStyles.card.titleSize,
        fontWeight: 'bold',
        flex: 1,
        color: AppStyles.mainBlackColor,
    },
    address: {
        marginBottom: 4,
        color: AppStyles.secondaryBlackColor,
        fontSize: AppStyles.card.subtitleSize
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
        marginVertical: 3,
    }
})