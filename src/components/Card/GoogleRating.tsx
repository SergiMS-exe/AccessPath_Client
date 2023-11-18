import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AppStyles } from "../Shared/AppStyles";

type GoogleRatingProps = {
    googleRating: number;
    position?: 'start' | 'end';
}

const GoogleRating = ({ googleRating, position = 'end' }: GoogleRatingProps) => {
    const justifyContent = position === 'start' ? 'flex-start' : 'flex-end';
    return (
        <View style={[styles.container, { justifyContent }]}>
            <Text style={styles.rating}>{googleRating}/5</Text>
            <Icon size={17}
                name='star' color={AppStyles.card.starColor}
                solid style={{ marginTop: 2, marginHorizontal: 2 }} />
            <Icon size={17} name='google' color='#4285F4'
                solid style={{ marginTop: 2 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center', // This ensures that the icons and text are aligned in the cross axis
    },
    rating: {
        fontSize: 17,
        color: AppStyles.mainBlackColor,
    }
});

export default GoogleRating;
