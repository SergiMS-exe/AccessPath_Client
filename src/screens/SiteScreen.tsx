import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackHeader } from "../components/Headers/StackHeader";
import { ActivityIndicator, KeyboardAvoidingView, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Site } from "../../@types/Site";
import Icon from "react-native-vector-icons/FontAwesome5";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { CloseSitesContext, LoginContext, MySitesContext } from "../components/Shared/Context";
import MapView, { Marker } from "react-native-maps";
import { useSiteSaving } from "../hooks/useSiteSaving";
import { CommentsInput } from "../components/CommentsInput";
import { getComments } from "../services/PlacesServices";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Comment } from "../components/Comment";
import { CommentType } from "../../@types/CommentType";
import useComments from "../hooks/useComments";
import { AddEditRating } from "../components/AddEditRating";
import { AppStyles } from "../components/Shared/AppStyles";
import DropDownAverages from "../components/DropDownAverages";
import PhotoCarousel from "../components/PhotoCarousel";
import { getUserRatings } from "../services/UserServices";
import Snackbar from "react-native-snackbar";
import { Valoracion } from "../../@types/Valoracion";

type RootStackParamList = {
    site: { site: Site };
};

type SiteScreenRouteProp = RouteProp<RootStackParamList, "site">;

type StackProps = NativeStackNavigationProp<any, any>;

export const SiteScreen = () => {
    const navigation = useNavigation<StackProps>();
    const route = useRoute<SiteScreenRouteProp>();
    const { user } = useContext(LoginContext);
    const { sites, setSites, appliedFilters, applyFilters } = useContext(CloseSitesContext);
    const { myComments, setMyComments, myRatings, setMyRatings } = useContext(MySitesContext);

    const [site, setSite] = useState<Site>(route.params.site);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showAddEditRating, setShowAddEditRating] = useState(false);
    const [rating, setRating] = useState<Valoracion | undefined>(undefined);

    const { save, unSave, toggleUserContext } = useSiteSaving(site);
    const { comments, setComments, addComment, deleteComment, updateComment } = useComments(route.params.site.comentarios);

    useEffect(() => {
        const fetchDataComments = async () => {
            //Obtener el nombre de los usuarios que han comentado 
            const data: CommentType[] = await getComments(site);
            setLoading(false)

            if (data)
                setComments(data);
        };

        const fetchDataRatings = async () => {
            let data;
            if (user) {
                data = await getUserRatings(user);
                if ('success' in data) {
                    if (data.success) {
                        setMyRatings(data.sitesWRatings);
                        setShowAddEditRating(true)
                    }
                    else {
                        Snackbar.show({
                            text: data.message,
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: AppStyles.mainRedColor,
                            action: {
                                text: 'Reintentar',
                                textColor: 'green',
                                onPress: () => {
                                    fetchDataRatings();
                                },
                            },
                        });
                    }
                }
            }
        };

        fetchDataComments();

        //si el usuario no ha llamado a getUserRatings
        fetchDataRatings();

        if (myRatings.length > 0) { // si hay valoraciones en el contexto
            const index = myRatings.findIndex((s) => s.site.placeId === site.placeId);
            if (index !== -1) { //si el sitio esta en myRatings
                setRating(myRatings[index].valoracion);
            }
        }
    }, [])

    useEffect(() => {
        setSite(route.params.site);
    }, [route.params.site]);


    useEffect(() => {
        if (user?.saved.includes(site.placeId)) {
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    }, [site.placeId, user?.saved]);

    useEffect(() => {
        const index = myRatings.findIndex((s) => s.site.placeId === site.placeId);
        if (index !== -1) { //si el sitio esta en myRatings
            setRating(myRatings[index].valoracion);
        } else {
            setRating(undefined);
        }
    }, [myRatings]);

    const handleRatingDeleted = (newPlace: Site) => {
        // Actualizar el estado del sitio con el nuevo lugar
        setSite({ ...newPlace });
    };

    const handleAttributeChange = () => {
        const index = sites.findIndex((s) => s.placeId === site.placeId);
        if (index !== -1) {
            const updatedSite = {
                ...sites[index],
                comentarios: site.comentarios,
                valoraciones: site.valoraciones,
                fotos: site.fotos
            };
            const newSites = [...sites];
            newSites[index] = updatedSite;
            setSites(newSites);
            applyFilters(appliedFilters);
        }
    };

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
        addComment(newComment);
        const updatedSite = {
            ...site,
            comentarios: site.comentarios ? [...site.comentarios, newComment] : [newComment]
        };
        setSite(updatedSite);

        //Añadir el sitio a myComments o actualizarlo
        const index = myComments.findIndex((s) => s.placeId === site.placeId);
        if (index !== -1) { //Si ya existe el sitio en myComments
            const updatedSite = {
                ...myComments[index],
                comentarios: myComments[index].comentarios ? [...myComments[index].comentarios as CommentType[], newComment] : [newComment] //Añadir el comentario al sitio
            };
            const newSites = [...myComments];
            newSites[index] = updatedSite;
            setMyComments(newSites);
        } else {
            setMyComments([...myComments, site]);
        }

        handleAttributeChange();
    }

    const updateComments = (comment: CommentType, wantsToDelete: boolean) => {
        if (wantsToDelete) {
            deleteComment(comment._id);
            if (site.comentarios) {
                const updatedComments = site.comentarios.filter(c => c._id !== comment._id);
                const updatedSite = {
                    ...site,
                    comentarios: updatedComments
                };
                setSite(updatedSite);

                //Actualizar el sitio en myComments
                const index = myComments.findIndex((s) => s.placeId === site.placeId);
                if (index !== -1) { //Si ya existe el sitio en myComments
                    //si el comentario eliminado era el ultimo
                    if (updatedComments.length === 0) {
                        const newSites = [...myComments];
                        newSites.splice(index, 1);
                        setMyComments(newSites);
                    }
                    else {
                        const updatedSite = {
                            ...myComments[index],
                            comentarios: updatedComments
                        };
                        const newSites = [...myComments];
                        newSites[index] = updatedSite;
                        setMyComments(newSites);
                    }
                }
            }
        } else {
            updateComment(comment);
            if (site.comentarios) {
                const updatedComments = site.comentarios.map(c => c._id === comment._id ? comment : c);
                const updatedSite = {
                    ...site,
                    comentarios: updatedComments
                };
                setSite(updatedSite);

                //Actualizar el sitio en myComments
                const index = myComments.findIndex((s) => s.placeId === site.placeId);
                if (index !== -1) { //Si ya existe el sitio en myComments
                    const updatedSite = {
                        ...myComments[index],
                        comentarios: updatedComments
                    };
                    const newSites = [...myComments];
                    newSites[index] = updatedSite;
                    setMyComments(newSites);
                }
            }
        }
        handleAttributeChange();
    };


    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${site.location?.latitude},${site.location?.longitude}&query=${encodeURIComponent(site.nombre)}`;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StackHeader iconRight="camera-plus" onPressRight={() => navigation.navigate('addPhoto', { site })} />
            {showAddEditRating && <AddEditRating valoracion={rating} site={site} isAbsolute onRatingDeleted={handleRatingDeleted} calledFrom="site" />}
            <ScrollView
                style={styles.container}
                automaticallyAdjustKeyboardInsets={true}
                contentContainerStyle={{ paddingBottom: 110 }}
                keyboardShouldPersistTaps="handled"
            >
                {(site.fotos && site.fotos.length > 0) && <PhotoCarousel photos={site.fotos} />}
                <Text style={styles.name}>{site.nombre}</Text>
                <View style={styles.subContainer}>
                    <Text style={{ fontSize: 18 }}>{site.types[2]}, {site.types[3]}</Text>
                    {user &&
                        <TouchableOpacity onPress={handleSave}>
                            <Icon name='heart' size={25} solid={isSaved} color={isSaved ? AppStyles.mainRedColor : AppStyles.mainBlackColor} />
                        </TouchableOpacity>}
                </View>
                <Text style={styles.rating}>{site.calificacionGoogle}/5 <Icon size={20} name='star' color='#e8e82e' solid /></Text>
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
                            style={{ width: "100%", height: 110, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
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
                <SectionHeader title="Valoraciones">
                    <DropDownAverages media={site.valoraciones} />
                </SectionHeader>

                {/*Comentarios*/}
                <SectionHeader title="Comentarios" >
                    {loading ?
                        <ActivityIndicator size="large" style={{ marginTop: 10 }} /> : (
                            <View style={{ marginTop: 12 }}>
                                {comments && comments.map(comment => (
                                    <Comment key={comment._id}
                                        comment={comment}
                                        updateComments={updateComments}
                                        placeId={site.placeId}
                                        onEditFocus={() => setShowAddEditRating(false)} onEditBlur={() => setShowAddEditRating(true)} />
                                ))}
                                {user && <CommentsInput
                                    user={user}
                                    site={site}
                                    onCommentSent={handleNewComment}
                                    onFocus={() => setShowAddEditRating(false)} onBlur={() => setShowAddEditRating(true)}
                                />}
                            </View>
                        )
                    }
                </SectionHeader>
            </ScrollView>
        </SafeAreaView >
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
        fontSize: 34,
        marginBottom: 15,
        color: AppStyles.fontColorBlack,
        fontWeight: '500'
    },
    address: {
        fontSize: 18
    },
    addressContainer: {
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 15,
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
        fontSize: 16,
        fontWeight: "400",
        textAlignVertical: "bottom"
    },
    sectionContainer: {
        marginTop: 15
    },
    sectionHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    sectionTitle: {
        fontSize: 25,
        color: '#333',
        fontWeight: "500"
    },
    sectionButton: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 100,
        padding: 3,
    },

})