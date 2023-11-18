import { Skeleton } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Photo } from '../../@types/Site';
import { usePhotos } from '../hooks/usePhotos';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Props = {
    photos?: Photo[];
};

type StackProps = NativeStackNavigationProp<any, any>;

const PhotoCarousel = ({ photos }: Props) => {
    const navigation = useNavigation<StackProps>();

    const imageUris = usePhotos(photos);

    const renderContent = () => {
        // Si hay fotos
        if (photos && photos.length > 0 && imageUris) {
            return imageUris.map((uri: string, index: number) => (
                <TouchableOpacity key={index} accessible accessibilityRole='button' accessibilityLabel={photos[index] && photos[index].alternativeText}
                    onPress={() => navigation.navigate('photoDetail', { photos, index })}
                    style={styles.slide}>
                    <Image source={{ uri: uri }} style={styles.image} />
                </TouchableOpacity>
            ));
        }
        // Si no hay fotos, renderizar 3 skeletons
        // else {
        //     return Array(3).fill(null).map((_, index) => (
        //         <View key={index} style={styles.slide}>
        //             <Skeleton width={200} height={150} />
        //         </View>
        //     ));
        // }
    };

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {renderContent()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    slide: {
        marginRight: 10,
    },
    image: {
        width: 200,
        height: 150,
        resizeMode: 'cover',
    },
});

export default PhotoCarousel;
