import React, { useEffect, useState } from 'react';

import { LeafletView, MapLayerType } from 'react-native-leaflet-view';
import { useLocation } from '../hooks/useLocation';

export const Map = () => {
    const [mapLoaded, setMapLoaded] = useState(false);

    const {location, error} = useLocation();

    const mapLayers = [{
        attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        baseLayerIsChecked: true,
        baseLayerName: 'OpenStreetMap.Mapnik',
        url: 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=2DdNjK8laXD22qDxNXdX',
        layerType: MapLayerType.TILE_LAYER
    }];

    return(
        <LeafletView
        mapLayers={mapLayers}
        mapCenterPosition={location}
        mapMarkers={[
            {
              position: location,
              icon: '📍',
              size: [32, 32],
            },
          ]}
        />
    )
}