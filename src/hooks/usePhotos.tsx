import { useState, useEffect } from 'react';
import { Photo } from '../../@types/Site';
import { Buffer } from 'buffer';

export const usePhotos = (photos: Photo[]): string[] => {
    const [imageUris, setImageUris] = useState<string[]>([]);

    useEffect(() => {
        const convertedUris = photos.map(photo => {
            const base64String = Buffer.from(photo.fotoBuffer).toString('base64');
            return `data:image/jpeg;base64,${base64String}`;
        });

        setImageUris(convertedUris);
    }, [photos]);

    return imageUris;
};
