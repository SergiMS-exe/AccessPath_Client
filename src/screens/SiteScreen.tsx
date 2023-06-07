import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackHeader } from "../components/Headers/StackHeader";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Site } from "../../@types/Site";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useContext, useEffect, useState } from "react";
import { save } from "../services/PlacesServices";
import { LoginContext } from "../components/Shared/Context";
import Person from "../../@types/Person";
import { Map } from "../components/Map";
import MapView from "react-native-maps";


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
    const { user, setUser } = useContext(LoginContext);


    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        console.log("User " + user?.saved);
        console.log("Place " + site.placeId);

        if (user)
            if (user?.saved.includes(site.placeId))
                setIsSaved(true)

    }, [])

    const handleSave = async () => {
        if (user) {
            await save(site, user, !isSaved)
            setIsSaved(!isSaved);
            const newUser = new Person(user);
            if (!isSaved) {
                newUser.save(site.placeId)
                setUser(newUser)
            } else {
                newUser.unSave(site.placeId)
                setUser(newUser)
            }
        }
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
