import { useState, useEffect } from 'react';
import { Photo } from '../../@types/Site';

export const usePhotos = (photos: Photo[]): string[] => {
    const [imageUris, setImageUris] = useState<string[]>([]);

    useEffect(() => {
        if (photos.length > 0) {
            const convertedUris = photos.map(photo => `data:image/jpeg;base64,${photo.base64}`);
            setImageUris(convertedUris);
        } else {
            setImageUris([]);
        }
    }, [photos]);

    return imageUris;
};
