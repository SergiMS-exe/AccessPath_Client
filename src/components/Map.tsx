import React, { useContext, useEffect, useState } from 'react';

import { useLocation } from '../hooks/useLocation';
import MapView, { Marker } from 'react-native-maps';
import { MapCard } from './Card/MapCard';
import { useCard } from '../hooks/useCard';
import { StyleSheet } from 'react-native';
import { Site } from '../../@types/Site';
import { CloseSitesContext, initialFilters } from './Shared/Context';
import Snackbar from 'react-native-snackbar';

type Props = {
    setShowButton: (show: boolean) => void;
}

export const Map = ({ setShowButton }: Props) => {
    const { sites, filteredSites, appliedFilters } = useContext(CloseSitesContext);
    const { location, error, resetLocation } = useLocation();
    const { cardData, handleShowCard, handleCloseCard } = useCard();

    const [sitesToShow, setSitesToShow] = useState<Site[]>([]);
    const [timesPOITouched, setTimesPOITouched] = useState<number>(0);

    useEffect(() => {
        if ((filteredSites.length > 0) || (filteredSites.length === 0 && appliedFilters != initialFilters)) {
            setSitesToShow(filteredSites);
        } else {
            setSitesToShow(sites);
        }
    }, [sites, filteredSites]);

    const handlePressMarker = (site: Site) => {
        handleShowCard(site);
        setShowButton(false);
    }

    const handlePressMap = () => {
        handleCloseCard();
        setShowButton(true);
    }

    const handlePressPOI = () => {
        handlePressMap();
        setTimesPOITouched(timesPOITouched + 1);
        if (timesPOITouched >= 2) {
            Snackbar.show({
                text: 'Para obtener información de un punto de interés, búscalo en la barra de búsqueda.',
                duration: Snackbar.LENGTH_SHORT,
            });
            setTimesPOITouched(0);
        }
    }

    return (
        <>
            <MapView
                onPress={() => {
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
                minZoomLevel={8}
                loadingEnabled={true}
                // customMapStyle={[{
                //     "featureType": "poi",
                //     "stylers": [
                //       { "visibility": "off" }
                //     ]
                //   }]}
                onPoiClick={(e) => {
                    //handlePressPOI();
                }}
            >
                {sitesToShow.map(site =>
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
                        style={{ zIndex: 10 }}
                    />
                )}
            </MapView>
            {cardData && <MapCard site={cardData} />}
        </>
    )
}