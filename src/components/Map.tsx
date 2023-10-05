import React, { useContext, useEffect, useState } from 'react';

import { useLocation } from '../hooks/useLocation';
import MapView, { Marker } from 'react-native-maps';
import { MapCard } from './Card/MapCard';
import { useCard } from '../hooks/useCard';
import { StyleSheet } from 'react-native';
import { Site } from '../../@types/Site';
import { CloseSitesContext } from './Shared/Context';

type Props = {
    setShowButton: (show: boolean) => void;
}

export const Map = ({ setShowButton }: Props) => {
    const { sites } = useContext(CloseSitesContext);
    const { location, error, resetLocation } = useLocation();
    const { cardData, handleShowCard, handleCloseCard } = useCard();

    const handlePressMarker = (site: Site) => {
        handleShowCard(site);
        setShowButton(false);
    }

    const handlePressMap = () => {
        handleCloseCard();
        setShowButton(true);
    }

    return (
        <>
            <MapView
                onPress={() => {
                    //Cada vez que se hace click en el mapa se hace llamada api.
                    //Cuando se hace llamada a api se guardan los resultados en cache junto con un radio.
                    //Si luego se hace click en otro sitio dentro del radio se usan los datos de cache.
                    //Si se hace click fuera se hace una nueva llamada
                    handlePressMap();
                }}
                provider='google'
                showsUserLocation
                showsMyLocationButton
                moveOnMarkerPress
                style={{ ...StyleSheet.absoluteFillObject, zIndex: 0 }}
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0122,
                    longitudeDelta: 0.0121,
                }}
                maxZoomLevel={19}
                minZoomLevel={10}
                loadingEnabled={true}
                // customMapStyle={[{
                //     "featureType": "poi",
                //     "stylers": [
                //       { "visibility": "off" }
                //     ]
                //   }]}
                onPoiClick={(e) => {
                    handlePressMap();
                }}
            >
                {sites.map(site =>
                    <Marker
                        key={site.placeId}
                        coordinate={{
                            latitude: site.location.latitude,
                            longitude: site.location.longitude
                        }}
                        onPress={(e) => {
                            e.stopPropagation()
                            handlePressMarker(site)
                        }}
                        title={site.nombre}
                    />
                )}
            </MapView>
            {cardData && <MapCard site={cardData} />}
        </>
    )
}