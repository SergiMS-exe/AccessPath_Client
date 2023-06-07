import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackHeader } from "../components/Headers/StackHeader";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Site } from "../../@types/Site";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../components/Shared/Context";
import MapView from "react-native-maps";
import { useSiteSaving } from "../hooks/useSiteSaving";


type RootStackParamList = {
    site: { site: Site };
};

type SiteScreenRouteProp = RouteProp<RootStackParamList, "site">;

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    subContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    name: {
        fontSize: 35,
        marginBottom: 15
    },
    address: {
        fontSize: 15,
    },
    addressButton: {
        flexDirection: "row",
        //flex: 1,
        width: "100%"
    },
    rating: {
        fontWeight: "400",
        textAlignVertical: "bottom"
    }
})

export const SiteScreen = () => {
    const route = useRoute<SiteScreenRouteProp>();
    const { site } = route.params;
    const { user } = useContext(LoginContext);

    const [isSaved, setIsSaved] = useState(false);

    const { save, unSave, toggleUserContext } = useSiteSaving(site)

    useEffect(() => {
        if (user?.saved.includes(site.placeId)) {
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    }, [site.placeId, user?.saved]);    

    const handleSave = async () => {
        if (isSaved)
            await unSave()
        else 
            await save()
        setIsSaved(!isSaved)
        toggleUserContext(isSaved);
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
                    {user &&
                        <TouchableOpacity onPress={handleSave}>
                            <Icon name='heart' size={20} solid={isSaved} />
                        </TouchableOpacity>}
                </View>
                <View style={styles.addressButton}>

                    <Text style={styles.address} numberOfLines={2}>{site.direccion}</Text>
                    <TouchableOpacity
                        style={{ width: "100%", paddingHorizontal: 10 }}
                        onPress={() => Linking.openURL(googleMapsLink)}
                    >
                        <MapView
                            initialRegion={{
                                latitude: site.location.latitude,
                                longitude: site.location.longitude,
                                latitudeDelta: 0.0522,
                                longitudeDelta: 0.0522
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            pitchEnabled={false}
                            rotateEnabled={false}
                            provider="google"
                            style={{ width: 50, height: 50 }}
                        />

                    </TouchableOpacity>
                </View>
                <Text style={styles.rating}>{site.calificacion}/5 <Icon size={20} name='star' color='#e8e82e' solid /></Text>
            </View>
        </SafeAreaView>
    );
};
