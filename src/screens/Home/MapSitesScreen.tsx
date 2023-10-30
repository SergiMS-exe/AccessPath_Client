import React, { useState } from 'react';
import { Map } from '../../components/Map';
import MyFAB from '../../components/FloatingButton';
import FilterFAB from '../../components/FilterFAB';

export const MapSitesScreen = () => {

    const [showButton, setShowButton] = useState(true);

    return (
        <>
            <Map setShowButton={setShowButton} />
            <FilterFAB style={{ right: 50 }} />
            <MyFAB
                name='map'
                loading={false}
                showing={showButton}
            />
        </>
    )
}


