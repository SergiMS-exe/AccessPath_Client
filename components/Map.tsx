import React, { useState } from 'react';

import { LatLng, LeafletView } from 'react-native-leaflet-view';

const DEF_LOCATION : LatLng = {
    lat: 43.3603,
    lng: -5.84476
}

export const Map = () => {
    const [userCurrentPosition, setUserCurrentPosition] = useState([43.3603, -5.84476]);
    return(
        <LeafletView 
        mapCenterPosition={DEF_LOCATION}
        mapMarkers={[
            {
              position: DEF_LOCATION,
              icon: '📍',
              size: [32, 32],
            },
          ]}
        />
    )
}