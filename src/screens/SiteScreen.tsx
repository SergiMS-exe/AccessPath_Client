import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackHeader } from "../components/Headers/StackHeader";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Site } from "../../@types/Site";
import Icon from "react-native-vector-icons/FontAwesome5";


type RootStackParamList = {
    site: { site: Site };
};

type SiteScreenRouteProp = RouteProp<RootStackParamList, "site">;

const styles = StyleSheet.create({
    container:{
        margin: 15
    },
    name : {
        fontSize: 35,
    },
    address: {
        fontSize: 20,
    },
    rating: {
        fontWeight: "400",
        textAlignVertical: "bottom"
    }
})

export const SiteScreen = () => {
    const route = useRoute<SiteScreenRouteProp>();
    const { site } = route.params;

    return (
        <SafeAreaView>
            <StackHeader />
            {/* <ScrollView alwaysBounceHorizontal horizontal/> */}
            <View style={styles.container}>
                <Text style={styles.name}>{site.nombre}</Text>
                <Text style={styles.address}>{site.direccion}</Text>
                <Text style={styles.rating}>{site.calificacion}/5 <Icon size={20} name='star' color='#e8e82e' solid /></Text>
                {/* Resto del contenido */}
            </View>
        </SafeAreaView>
    );
};
