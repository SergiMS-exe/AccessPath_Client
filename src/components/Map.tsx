import React, { useState } from 'react';

import { LatLng, LeafletView, MapLayerType } from 'react-native-leaflet-view';

const DEF_LOCATION : LatLng = {
    lat: 43.3603,
    lng: -5.84476
}

export const Map = () => {
    const [userCurrentPosition, setUserCurrentPosition] = useState([43.3603, -5.84476]);
    return(
        <LeafletView
        mapLayers={[{
          attribution:
            '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          baseLayerIsChecked: true,
          baseLayerName: 'OpenStreetMap.Mapnik',
          url: 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=2DdNjK8laXD22qDxNXdX',
          layerType: MapLayerType.TILE_LAYER
        }]}
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