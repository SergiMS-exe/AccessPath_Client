import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackHeader } from '../components/Headers/StackHeader';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MainButton from '../components/MainButton';
import { sendPhoto } from '../services/PlacesServices';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Site } from '../../@types/Site';
import { CloseSitesContext, LoginContext, MySitesContext } from '../components/Shared/Context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStyles } from '../components/Shared/AppStyles';
import Snackbar from 'react-native-snackbar';
import { useLoading } from '../hooks/useLoading';

type RootStackParamList = {
    site: { site: Site };
};

type SiteScreenRouteProp = RouteProp<RootStackParamList, "site">;

type StackProps = NativeStackNavigationProp<any, any>;

const AddPhoto = () => {

    const { user } = useContext(LoginContext);
    const { myPhotos, setMyPhotos } = useContext(MySitesContext);
    const { sites, setSites } = useContext(CloseSitesContext);

    const route = useRoute<SiteScreenRouteProp>();
    const site = route.params.site;

    const navigation = useNavigation<StackProps>();

    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [alternativeText, setAlternativeText] = useState<string>('');

    const { isLoading, loading, stopLoading } = useLoading();

    useEffect(() => {
        setAlternativeText('');
    }, [selectedImage])

    const openImagePicker = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        dismissKeyboard(); // cierra el teclado si está abierto

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('Image picker error: ', response.errorMessage, response.errorCode);
            } else {
                let imageUri = response.assets?.[0]?.uri;
                setSelectedImage(imageUri);
            }
        });
    };

    const handleSendPhoto = async () => {
        if (alternativeText.length === 0) {
            Snackbar.show({
                text: 'Por favor, ingrese un texto alternativo para la foto',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red'
            });
            return;
        }
        loading();
        const response = await sendPhoto(selectedImage!, site, user!._id, alternativeText);
        stopLoading();
        if (response.success) {
            navigation.navigate('site', { site: response.newPlace });
            if (response.newPlace) {
                //first check if the site is already in myPhotos
                const index = myPhotos.findIndex(s => s.placeId === response.newPlace?.placeId);
                if (index !== -1) {
                    const newMyPhotos = [...myPhotos];
                    newMyPhotos[index] = response.newPlace;
                    setMyPhotos(newMyPhotos);
                }
                else
                    setMyPhotos([...myPhotos, response.newPlace]);
                //then check if the site is already in sites
                const index2 = sites.findIndex(s => s.placeId === response.newPlace?.placeId);
                if (index2 !== -1) {
                    const newSites = [...sites];
                    newSites[index2] = response.newPlace;
                    setSites(newSites);
                }
                else
                    setSites([...sites, response.newPlace]);
            }
        }
        else
            console.log(response.message);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <StackHeader />
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <View style={styles.container}>
                        {selectedImage && (
                            <TouchableOpacity onPress={() => setSelectedImage(undefined)} style={styles.closeButton}>
                                <Icon name='times' size={30} color="white" />
                            </TouchableOpacity>
                        )}
                        {selectedImage ? (
                            <Image
                                source={{ uri: selectedImage }}
                                style={{ height: '100%', width: '100%' }}
                                resizeMode='contain' />
                        ) : (
                            <View style={styles.noPhotoContainer}>
                                <Text style={styles.noPhotoText}>No hay foto seleccionada</Text>
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback >
                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={openImagePicker}>
                        <Icon name='image' size={50} color={AppStyles.mainBlackColor} />
                    </TouchableOpacity>
                    {
                        selectedImage ? (
                            <MainButton
                                title='Subir foto' onPress={handleSendPhoto}
                                titleStyle={{ fontSize: 20, marginLeft: 0 }}
                                loading={isLoading} />

                        ) : (
                            <View />
                        )
                    }
                </View>
                {selectedImage &&
                    <TextInput
                        style={styles.textInput}
                        value={alternativeText}
                        onChangeText={(text) => setAlternativeText(text)}
                        placeholder='Texto alternativo de la foto...'
                        placeholderTextColor='white'
                    />
                }
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const containerHeight = Platform.OS === 'ios' ? '85%' : '80%';
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: containerHeight,
        backgroundColor: '#c0c0c0',
        flexDirection: 'column',
    },
    closeButton: {
        zIndex: 1,
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        paddingHorizontal: 5,
    },
    noPhotoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noPhotoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    textInput: {
        width: '90%',
        position: 'absolute',
        bottom: 90,
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#594D59',
        paddingLeft: 20,
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    },
    footerContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 20
    }

});
export default AddPhoto;
