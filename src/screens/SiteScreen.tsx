import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackHeader } from "../components/Headers/StackHeader";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Site } from "../../@types/Site";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";


type RootStackParamList = {
    site: { site: Site };
};

type SiteScreenRouteProp = RouteProp<RootStackParamList, "site">;

const styles = StyleSheet.create({
    container:{
        margin: 15
    },
    subContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    name : {
        fontSize: 35,
        marginBottom: 15
    },
    address: {
        fontSize: 17,
    },
    rating: {
        fontWeight: "400",
        textAlignVertical: "bottom"
    }
})

export const SiteScreen = () => {
    const route = useRoute<SiteScreenRouteProp>();
    const { site } = route.params;

    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(!isSaved);
    }

    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${site.location?.latitude},${site.location?.longitude}&query=${encodeURIComponent(site.nombre)}`;

    return (
        <SafeAreaView>
            <StackHeader />
            {/* <ScrollView alwaysBounceHorizontal horizontal/> */}
            <View style={styles.container}>
                <Text style={styles.name}>{site.nombre}</Text>
                <View style={styles.subContainer}>
                    <Text>{site.types[2]}, {site.types[3]}</Text>
                    <TouchableOpacity onPress={handleSave}>
                        <Icon name='heart' size={20} solid={isSaved}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.address}>{site.direccion}</Text>
                <TouchableOpacity onPress={ () => Linking.openURL(googleMapsLink)}>
                    <Text>A Maps</Text>
                </TouchableOpacity>
                <Text style={styles.rating}>{site.calificacion}/5 <Icon size={20} name='star' color='#e8e82e' solid /></Text>
            </View>
        </SafeAreaView>
    );
};
