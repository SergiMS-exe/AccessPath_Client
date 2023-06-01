import React, { useEffect, useState } from 'react';

import { LeafletView, MapLayerType } from 'react-native-leaflet-view';
import { useLocation } from '../hooks/useLocation';
import MapView, { Marker } from 'react-native-maps';
import { Card } from './Card';
import { useCard } from '../hooks/useCard';
import { StyleSheet } from 'react-native';

type Props = {
    setShowButton: Function;
}

export const Map = ({ setShowButton }: Props) => {
    const [mapLoaded, setMapLoaded] = useState(false);

    const { location, error } = useLocation();
    const { cardData, handleShowCard, handleCloseCard } = useCard();

    useEffect(()=>{
        console.log(cardData);
        
    }, [cardData])

    const mapLayers = [{
        attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        baseLayerIsChecked: true,
        baseLayerName: 'OpenStreetMap.Mapnik',
        url: 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=2DdNjK8laXD22qDxNXdX',
        layerType: MapLayerType.TILE_LAYER
    }];

    return (
        // <LeafletView
        // mapLayers={mapLayers}
        // mapCenterPosition={location}
        // mapMarkers={[
        //     {
        //       position: location,
        //       icon: '📍',
        //       size: [32, 32],
        //     },
        //   ]}
        // />
        <>
            <MapView
                onPress={() => {
                    //Cada vez que se hace click en el mapa se hace llamada api.
                    //Cuando se hace llamada a api se guardan los resultados en cache junto con un radio.
                    //Si luego se hace click en otro sitio dentro del radio se usan los datos de cache.
                    //Si se hace click fuera se hace una nueva llamada
                    handleCloseCard();
                    setShowButton(true)
                }}
                provider='google'
                style={{ ...StyleSheet.absoluteFillObject, zIndex: 0 }}
                region={{
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0421,
                }}
                onMarkerPress={(e)=>{
                    
                    handleShowCard({});
                    setShowButton(false)
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.lat,
                        longitude: location.lng
                    }}
                    onPress={() => {
                        handleShowCard({});
                        setShowButton(false)
                        
                    }}
                />
            </MapView>
            {cardData != null && <Card />}
        </>

    )
}