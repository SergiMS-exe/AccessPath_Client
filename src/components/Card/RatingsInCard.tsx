import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TypesOfDisabilities, Valoracion } from "../../../@types/Valoracion";
import { useRatings } from "../../hooks/useRatings";
import { AppStyles } from '../Shared/AppStyles';

type Props = {
    media: Valoracion | undefined;
}

const RatingsInCard = ({ media }: Props) => {

    const { getDisabilitiesIcon, getMainCategoryRating } = useRatings();

    const ratingFisica = getMainCategoryRating(TypesOfDisabilities.fisica, media)?.toLocaleString() || '--';
    const ratingSensorial = getMainCategoryRating(TypesOfDisabilities.sensorial, media)?.toLocaleString() || '--';
    const ratingPsiquica = getMainCategoryRating(TypesOfDisabilities.psiquica, media)?.toLocaleString() || '--';


    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Icon size={17} color={AppStyles.mainBlackColor} name={getDisabilitiesIcon(TypesOfDisabilities.fisica)} />
                <Text style={styles.text}>{ratingFisica}</Text>
            </View>
            <View style={styles.subcontainer}>
                <Icon size={17} color={AppStyles.mainBlackColor} name={getDisabilitiesIcon(TypesOfDisabilities.sensorial)} />
                <Text style={styles.text}>{ratingSensorial}</Text>
            </View>
            <View style={styles.subcontainer}>
                <Icon size={17} color={AppStyles.mainBlackColor} name={getDisabilitiesIcon(TypesOfDisabilities.psiquica)} />
                <Text style={styles.text}>{ratingPsiquica}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    subcontainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 5,
    },
    text: {
        fontSize: 17,
        marginLeft: 2,
    }
});

export default RatingsInCard;