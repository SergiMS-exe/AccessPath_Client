import { useState, useEffect } from 'react';
import { Photo } from '../../@types/Site';

export const usePhotos = (photos: Photo[]): string[] => {
    const [imageUris, setImageUris] = useState<string[]>([]);

    useEffect(() => {
        const convertedUris = photos.map(photo => `data:image/jpeg;base64,${photo.base64}`);
        setImageUris(convertedUris);
    }, [photos]);

    return imageUris;
};
