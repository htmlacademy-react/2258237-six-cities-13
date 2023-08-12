import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

import { Icon, Marker, layerGroup } from 'leaflet';

import useMap from '../../hooks/useMap';

import { City } from '../../types/city';
import { Offer } from '../../types/offer';

import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../config';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOfferId: string;
}

function Map({city, offers, selectedOfferId}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = new Icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = new Icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(
          offer.id === selectedOfferId ? currentCustomIcon : defaultCustomIcon
        ).addTo(markerLayer);
      });

    }
  }, [map, offers, selectedOfferId]);

  return (
    <div style={{height: '100%'}} ref={mapRef}>
      test
    </div>
  );
}

export default Map;
