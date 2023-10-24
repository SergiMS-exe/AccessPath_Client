import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Dimensions, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Photo } from '../../@types/Site';
import { usePhotos } from '../hooks/usePhotos';
import { StackHeader } from '../components/Headers/StackHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainButton from '../components/MainButton';
import { AppStyles } from '../components/Shared/AppStyles';
import { LoginContext } from '../components/Shared/Context';
import { updateAccount } from '../services/UserServices';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
    PhotoDetail: { photos: Photo[]; index: number; };
};

type PhotoDetailScreenRouteProp = RouteProp<RootStackParamList, 'PhotoDetail'>;

const PhotoDetailScreen = () => {
    const { user } = useContext(LoginContext);
    const scrollViewRef = useRef(null);
    const route = useRoute<PhotoDetailScreenRouteProp>();

    const { photos, index } = route.params;

    const [currentIndex, setCurrentIndex] = useState(index);
    const [photosInView, setPhotosInView] = useState<Photo[]>(photos)

    const imageUris = usePhotos(photosInView);

    useEffect(() => {
        console.log(photosInView)
    }, [photosInView])

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
                    onPress: () => {
                        // Aquí puedes implementar la lógica para eliminar la foto del servidor
                        console.log(`Foto en el índice ${photoIndex} eliminada`);
                        // Después de eliminar la foto del servidor, puedes actualizar el estado local para reflejar los cambios
                        const updatedPhotos = [...photosInView];
                        if (updatedPhotos.length == 1)
                            setPhotosInView([])
                        else {
                            updatedPhotos.splice(photoIndex, 1);
                            setPhotosInView(updatedPhotos)
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
                <StackHeader />
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
                        <View key={idx} style={styles.page}>
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
