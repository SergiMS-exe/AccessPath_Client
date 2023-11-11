import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Site } from "../../../@types/Site";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AppStyles } from "../Shared/AppStyles";
import RatingsInCard from "./RatingsInCard";
import GoogleRating from "./GoogleRating";
import { usePhotos } from "../../hooks/usePhotos";
import { useContext, useEffect, useState } from "react";
import { CloseSitesContext } from "../Shared/Context";

type StackProps = NativeStackNavigationProp<any, any>;

type Props = {
    site: Site;
}

export const MapCard = ({ site }: Props) => {

    const { sites } = useContext(CloseSitesContext);

    const [siteToShow, setSiteToShow] = useState<Site>({ ...site });
    const navigation = useNavigation<StackProps>();

    const imageUris = usePhotos(siteToShow.fotos);

    const heightConditional = siteToShow.fotos && siteToShow.fotos.length > 0 ? '35%' : '15%';

    useFocusEffect(() => {
        setSiteToShow(sites.find(s => s.placeId === site.placeId)!);
    })

    return (
        <TouchableOpacity style={{ ...styles.container }} onPress={() => navigation.navigate("site", { site: siteToShow })}>
            {imageUris.length > 0 && <Image source={{ uri: imageUris[0] }} style={styles.image} />}
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{siteToShow.nombre}</Text>
                <Icon name='map-marker-alt' size={17} color='red' />
            </View>
            <Text style={styles.address}>{siteToShow.direccion}</Text>
            <View style={styles.footer}>
                <RatingsInCard media={siteToShow.valoraciones} />
                <GoogleRating googleRating={siteToShow.calificacionGoogle} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1000,
        justifyContent: 'center',
        marginLeft: '2.5%',
        borderWidth: AppStyles.border.borderWidth,
        borderTopColor: AppStyles.border.borderColor,
        backgroundColor: 'white',
        width: '95%',
        position: 'absolute',
        bottom: 10,
        borderRadius: 20,
        padding: 12,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        flex: 1,
        color: AppStyles.mainBlackColor
    },
    address: {
        marginBottom: 4,
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rating: {
        alignSelf: 'flex-end',
        marginTop: 4,
        fontSize: 17
    },
    image: {
        width: '100%',
        height: 130,
        resizeMode: 'cover',
        borderRadius: 10,
        marginVertical: 7
    }
})
