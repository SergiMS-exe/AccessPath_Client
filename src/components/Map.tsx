import React, { useEffect, useState } from 'react';

import { useLocation } from '../hooks/useLocation';
import MapView, { Marker } from 'react-native-maps';
import { MapCard } from './Card/MapCard';
import { useCard } from '../hooks/useCard';
import { StyleSheet } from 'react-native';
import { Site } from '../../@types/Site';

type Props = {
    setShowButton: (show: boolean) => void;
}

export const Map = ({ setShowButton }: Props) => {

    const { location, error, resetLocation } = useLocation();
    const { cardData, handleShowCard, handleCloseCard } = useCard();

    const [sites, setSites] = useState<Site[]>([]);

    useEffect(() => { // esto se podra borrar en un futuro
        console.log(cardData);

    }, [cardData])

    useEffect(() => {
        console.log(sites);
    }, [])

    return (
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
                onMarkerPress={(e) => {
                    setShowButton(false)
                }}
                loadingEnabled={true}
                // customMapStyle={[{
                //     "featureType": "poi",
                //     "stylers": [
                //       { "visibility": "off" }
                //     ]
                //   }]}
                onPoiClick={(e) => console.log(e.nativeEvent.name)}
            >
                {sites.map(site => (
                    <Marker
                        key={site.placeId}
                        coordinate={{
                            latitude: site.location.latitude,
                            longitude: site.location.longitude,
                        }}
                        onPress={(e) => {
                            handleShowCard(site);  // Suponiendo que handleShowCard puede tomar un sitio como argumento
                            setShowButton(false)
                        }}
                        title={site.nombre}
                    />
                ))}

                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    onPress={(e) => {
                        //console.log(e.nativeEvent);
                        handleShowCard(undefined);
                        setShowButton(false)
                    }}
                />
            </MapView>
            {cardData != null && <MapCard {...cardData} />}
        </>

    )
}