import { useEffect, useState } from 'react';
import { Site } from '../../@types/Site';

export const useCard = () => {
    const [cardData, setCardData] = useState<Site | undefined>(undefined);

    const handleShowCard = (data: Site | undefined) => {
        setCardData(data);
    };

    const handleCloseCard = () => {
        setCardData(undefined);
    };

    return { cardData, handleShowCard, handleCloseCard };
};
