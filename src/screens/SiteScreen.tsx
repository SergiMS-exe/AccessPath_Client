import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackHeader } from "../components/Headers/StackHeader";
import { ActivityIndicator, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Site } from "../../@types/Site";
import Icon from "react-native-vector-icons/FontAwesome5";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { LoginContext } from "../components/Shared/Context";
import MapView, { Marker } from "react-native-maps";
import { useSiteSaving } from "../hooks/useSiteSaving";
import { CommentsInput } from "../components/CommentsInput";
import { getComments } from "../services/PlacesServices";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Comment } from "../components/Comment";
import { CommentType } from "../../@types/CommentType";
import { Footer } from "../components/Footer";

type RootStackParamList = {
    site: { site: Site };
};

type SiteScreenRouteProp = RouteProp<RootStackParamList, "site">;

type StackProps = NativeStackNavigationProp<any, any>;

export const SiteScreen = () => {
    const navigation = useNavigation<StackProps>();
    const route = useRoute<SiteScreenRouteProp>();
    const { site } = route.params;
    const { user } = useContext(LoginContext);

    const [isSaved, setIsSaved] = useState(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState(true);

    const { save, unSave, toggleUserContext } = useSiteSaving(site)

    useEffect(() => {
        const fetchData = async () => {
            //Obtener el nombre de los usuarios que han comentado 
            const data: CommentType[] = await getComments(site);
            console.log(user)
            setLoading(false)

            setComments(data);
        };

        fetchData();
    }, [])

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

    const handleNewComment = (newComment: CommentType) => {
        console.log(newComment)
        setComments(prevComments => [...prevComments, newComment]);
    }

    const updateComments = (comment: CommentType, wantsToDelete: boolean) => {
        if (wantsToDelete)
            setComments(prevComments => prevComments.filter(c => c._id !== comment._id))
        else
            setComments(prevComments => prevComments.map(c => c._id === comment._id ? comment : c));
    };


    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${site.location?.latitude},${site.location?.longitude}&query=${encodeURIComponent(site.nombre)}`;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StackHeader />
            <ScrollView
                style={styles.container}
                keyboardDismissMode="on-drag"
            >
                <Text style={styles.name}>{site.nombre}</Text>
                <View style={styles.subContainer}>
                    <Text>{site.types[2]}, {site.types[3]}</Text>
                    {user &&
                        <TouchableOpacity onPress={handleSave}>
                            <Icon name='heart' size={20} solid={isSaved} />
                        </TouchableOpacity>}
                </View>
                <Text style={styles.rating}>{site.calificacion}/5 <Icon size={20} name='star' color='#e8e82e' solid /></Text>
                <View style={styles.addressContainer}>

                    <View style={styles.addressTextContainer}>
                        <Text style={styles.address}>{site.direccion}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.mapContainer}
                        onPress={() => Linking.openURL(googleMapsLink)}
                    >
                        <MapView
                            region={{
                                latitude: site.location.latitude,
                                longitude: site.location.longitude,
                                latitudeDelta: 0.00322,
                                longitudeDelta: 0.00722
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            pitchEnabled={false}
                            rotateEnabled={false}
                            provider="google"
                            style={{ width: "100%", height: 100, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: site.location.latitude,
                                    longitude: site.location.longitude
                                }}
                            />
                        </MapView>

                    </TouchableOpacity>
                </View>

                {/*Formularios*/}
                <SectionHeader title="Formularios" onPressButton={() => navigation.navigate('form')}>
                </SectionHeader>

                {/*Comentarios*/}
                <SectionHeader title="Comentarios" >{
                    loading ?
                        <ActivityIndicator /> : (
                            <>
                                {comments && comments.map((comment, index) => (
                                    <Comment key={index} comment={comment} updateComments={updateComments} placeId={site.placeId} />
                                ))}
                                {user && <CommentsInput user={user} site={site} onCommentSent={handleNewComment} />}
                            </>
                        )
                }
                </SectionHeader>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    );
};

type SectionProps = {
    title: string;
    onPressButton?: () => void;
    children: ReactNode
}
const SectionHeader = ({ title, onPressButton, children }: SectionProps) => {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionTitle}>{title}</Text>
                {onPressButton ? (
                    <TouchableOpacity onPress={onPressButton} style={styles.sectionButton}>
                        <Icon name="plus" size={20} />
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
            </View>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
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
    addressContainer: {
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
    },
    addressTextContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 7,
        marginTop: 12
    },
    mapContainer: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    rating: {
        fontWeight: "400",
        textAlignVertical: "bottom"
    },
    sectionContainer: {
        marginTop: 30
    },
    sectionHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    sectionTitle: {
        fontSize: 20
    },
    sectionButton: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 100,
        padding: 3,
    },

})