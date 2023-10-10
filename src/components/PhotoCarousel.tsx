import { Skeleton } from '@rneui/themed';
import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

interface Photo {
    id: string;
    //image: string;
}

const PhotoCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const data: Photo[] = [
        { id: '1' },//, image: './images/image1.jpg' },
        { id: '2' },//, image: './images/image2.jpg' },
        { id: '3' },//, image: './images/image3.jpg' }
        { id: '3' },//, image: './images/image3.jpg' }
        { id: '3' },//, image: './images/image3.jpg' }
        { id: '3' },//, image: './images/image3.jpg' }
        { id: '3' },//, image: './images/image3.jpg' }
        // Agrega más datos según sea necesario
    ];

    const screenWidth: number = Dimensions.get('window').width;

    const handleScroll = (event: any) => {
        const slideWidth: number = screenWidth;
        const offset: number = event.nativeEvent.contentOffset.x;
        const index: number = Math.floor(offset / slideWidth);
        setCurrentIndex(index);
    };

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        //onScroll={handleScroll}
        //scrollEventThrottle={16}
        >
            {data.map((photo: Photo, index: number) => (
                <View key={index} style={styles.slide}>
                    {/* <Image source={require(photo.image)} style={styles.image} /> */}
                    <Skeleton width={200} height={150} />

                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    slide: {
        marginRight: 10, // Agrega espacio entre los elementos
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
});

export default PhotoCarousel;
