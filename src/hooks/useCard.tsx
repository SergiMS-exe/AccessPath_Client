// useCard.js
import { SetStateAction, useState } from 'react';

export const useCard = () => {
    const [cardData, setCardData] = useState(null);

    const handleShowCard = (data: any) => {
        setCardData(data);
    };

    const handleCloseCard = () => {
        setCardData(null);
    };

    return { cardData, handleShowCard, handleCloseCard };
};
