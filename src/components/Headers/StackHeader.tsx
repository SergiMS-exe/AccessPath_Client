import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import { LoginContext } from "../Shared/Context";
import { useContext } from "react";
import { AppStyles } from "../Shared/AppStyles";

type Props = {
    title?: string;
    iconRight?: string;
    onPressRight?: () => void;
    onPressLeft?: () => void;
}

export const StackHeader = ({ title, iconRight, onPressRight, onPressLeft }: Props) => {

    const navigation = useNavigation();
    const { user } = useContext(LoginContext);
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onPressLeft ? onPressLeft : () => navigation.goBack()}
                accessible accessibilityRole='button' accessibilityHint="Volver a la pantalla anterior" accessibilityLabel='Volver'>
                <IconMaterial name='arrow-left-bold' size={45} color={AppStyles.mainBlackColor} />
            </TouchableOpacity>

            {title ? (
                <Text style={styles.titleText}>{title}</Text>
            ) : (
                <View style={styles.blank} />
            )}
            {(iconRight && onPressRight && user) &&
                <TouchableOpacity onPress={onPressRight}>
                    <IconMaterial name={iconRight} size={45} style={{ marginRight: 20 }}
                        color={AppStyles.mainBlackColor} />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: AppStyles.backgroundColor,
        paddingLeft: 15,
        //borderBottomWidth: 0.2,
        borderBottomColor: '#000',
        zIndex: 1
    },
    titleText: {
        color: AppStyles.mainBlackColor,
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    blank: {
        marginLeft: 10,
        flex: 1,
        borderBottomColor: '#000',
        //borderBottomWidth: 0.2,
        borderTopWidth: 0,
        height: 60
    },
});