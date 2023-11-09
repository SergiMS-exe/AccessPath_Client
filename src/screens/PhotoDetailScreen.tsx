import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Dimensions, ScrollView, Text, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Photo, Site } from '../../@types/Site';
import { usePhotos } from '../hooks/usePhotos';
import { StackHeader } from '../components/Headers/StackHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainButton from '../components/MainButton';
import { AppStyles } from '../components/Shared/AppStyles';
import { CloseSitesContext, LoginContext, MySitesContext } from '../components/Shared/Context';
import { deletePhoto } from '../services/PlacesServices';
import Snackbar from 'react-native-snackbar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
    PhotoDetail: { photos: Photo[]; index: number; };
    site: { site: Site };
};

type PhotoDetailScreenRouteProp = RouteProp<RootStackParamList, 'PhotoDetail'>;
type SiteScreenRouteProp = RouteProp<RootStackParamList, 'site'>;

type StackProps = NativeStackNavigationProp<any, any>;

const PhotoDetailScreen = () => {
    const { user } = useContext(LoginContext);
    const { myPhotos, setMyPhotos } = useContext(MySitesContext)
    const { sites, setSites } = useContext(CloseSitesContext)
    const scrollViewRef = useRef<ScrollView>(null);
    const routePhotoDetails = useRoute<PhotoDetailScreenRouteProp>();
    const routeSite = useRoute<SiteScreenRouteProp>();
    const navigation = useNavigation<StackProps>();


    const { photos, index } = routePhotoDetails.params;
    const { site } = routeSite.params;

    const [currentIndex, setCurrentIndex] = useState(index);
    const [photosInView, setPhotosInView] = useState<Photo[]>(photos)
    const [newPlace, setNewPlace] = useState<Site>(site);
    const [isModified, setIsModified] = useState<boolean>(false);

    const imageUris = usePhotos(photosInView);

    const onGoBack = useCallback(() => {
        // if (isModified) {
        //     navigation.navigate('site', { site: newPlace });
        // } else {
        navigation.goBack();
        // }
    }, [isModified, navigation, newPlace]);

    useEffect(() => {
        const onBackPress = () => {
            onGoBack();
            return true;
        }

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }
    }, [onGoBack]);

    useEffect(() => {
        if (scrollViewRef.current && index !== undefined) {
            const x = index * width;
            scrollViewRef.current.scrollTo({ x, animated: false });
        }
    }, [index, width]);

    const handleDeletePhoto = (photoIndex: number) => {
        Alert.alert(
            "Eliminar foto",
            "¿Estás seguro de que quieres borrar esta foto?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancelado"),
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: async () => {

                        const deleteResponse = await deletePhoto(photosInView[photoIndex]._id);
                        Snackbar.show({
                            text: deleteResponse.message,
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: deleteResponse.success ? AppStyles.secondaryBlackColor : AppStyles.mainRedColor
                        });
                        // Si la foto se eliminó correctamente, actualizar el estado
                        if (deleteResponse.success && 'newPlace' in deleteResponse) {
                            const newPlace: Site = deleteResponse.newPlace;

                            setIsModified(true);
                            setNewPlace(newPlace);

                            //Update closeSites
                            setSites(sites.map(site => {
                                if (site.placeId === newPlace.placeId) {
                                    return newPlace;
                                }
                                return site;
                            }
                            ));

                            if (photosInView.length === 1) {
                                setMyPhotos(myPhotos.filter(deletedSite => deletedSite.placeId !== newPlace.placeId));
                                setPhotosInView([]);
                            }
                            else {
                                setMyPhotos(myPhotos.map(site => {
                                    if (site.placeId === newPlace.placeId) {
                                        return newPlace;
                                    }
                                    return site;
                                }
                                ));
                                const updatedPhotos = [...photosInView];

                                updatedPhotos.splice(photoIndex, 1);
                                setPhotosInView(updatedPhotos)
                            }

                            // moverse de foto
                            let newCurrentIndex = photoIndex === 0 ? 0 : photoIndex - 1;
                            setCurrentIndex(newCurrentIndex);
                            if (scrollViewRef.current) {
                                const x = newCurrentIndex * width;
                                scrollViewRef.current.scrollTo({ x, animated: true });
                            }
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <GestureHandlerRootView style={styles.flexFull}>
            <SafeAreaView style={styles.safeArea}>
                <StackHeader onPressLeft={onGoBack} />
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => {
                        const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
                        setCurrentIndex(newIndex);
                    }}
                    ref={scrollViewRef}
                >
                    {imageUris.length > 0 ? imageUris.map((uri, idx) => (
                        <View key={uri} style={styles.page}>
                            <ScrollView
                                maximumZoomScale={3}
                                minimumZoomScale={1}
                                style={styles.zoomContainer}
                            >
                                <Image source={{ uri }} style={styles.image} />
                            </ScrollView>
                            {/* Verificar si el usuario es el autor de la foto */}
                            {photos[idx].usuarioId === user?._id && (
                                <MainButton title='Borrar foto' color={AppStyles.mainRedColor} onPress={() => handleDeletePhoto(idx)} />
                            )}
                        </View>
                    )) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No hay fotos para este sitio</Text>
                        </View>
                    )}
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    {imageUris.map((_, idx) => (
                        <View
                            key={idx}
                            style={[
                                styles.indicator,
                                currentIndex === idx ? styles.activeIndicator : null,
                            ]}
                        />
                    ))}
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    flexFull: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    page: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomContainer: {
        width: width,
        height: height * 0.8,
    },
    image: {
        width: width,
        height: height * 0.8,
        resizeMode: 'contain',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 4,
    },
    activeIndicator: {
        backgroundColor: '#000',
    },
    emptyContainer: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default PhotoDetailScreen;
