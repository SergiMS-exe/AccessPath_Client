import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Map } from '../../components/Map';
import MyFAB from '../../components/FloatingButton';

interface Props extends NativeStackScreenProps<any, any> { };

export const MapSitesScreen = ({ navigation }: Props) => {

    const [showButton, setShowButton] = useState(true);

    return (
        <>
            <Map setShowButton={setShowButton} />
            <MyFAB
                name='map'
                loading={false}
                showing={showButton}
            />
        </>
    )
}