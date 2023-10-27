// SiteWMyItems.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Site } from "../../@types/Site";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AppStyles } from "./Shared/AppStyles";

type Props = {
    site: Site;
    children?: React.ReactNode;
}

const SiteWMyItems = ({ site, children }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.navigate("site", { site })}>
                <>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{site.nombre}</Text>
                    <Text style={styles.address}>{site.direccion}</Text>
                </>
            </TouchableOpacity>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderColor: AppStyles.border.borderColor,
        borderWidth: AppStyles.border.borderWidth,
        borderRadius: AppStyles.border.borderRadius,
        backgroundColor: AppStyles.white,
        marginBottom: 12
    },
    touchableArea: {
        backgroundColor: '#f7f7f9',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2
    },
    title: {
        fontSize: AppStyles.card.titleSize,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    address: {
        marginBottom: 4
    },
});

export default SiteWMyItems;
