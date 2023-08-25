import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { Icon, Marker, layerGroup } from 'leaflet';

import useMap from '../../hooks/useMap';

import { City } from '../../types/city';
import { Offer } from '../../types/offer';

import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../config';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOfferId: string;
  layout: 'main' | 'offer';
}

const getIcon = (icon: string) => new Icon({
  iconUrl: icon,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({city, offers, selectedOfferId, layout}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const latLngs: [number, number][] = [];

  useEffect(() => {
    if (map) {
      const currentMarketIcon = getIcon(URL_MARKER_CURRENT);
      const defaultMarketIcon = getIcon(URL_MARKER_DEFAULT);

      const markerLayer = layerGroup().addTo(map);
      const polylineLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(
          offer.id === selectedOfferId ? currentMarketIcon : defaultMarketIcon
        ).addTo(markerLayer);

        latLngs.push([offer.location.latitude, offer.location.longitude]);
      });

      const polyline = L.polyline(latLngs).addTo(polylineLayer);
      map.fitBounds(polyline.getBounds(), {maxZoom: 12});
      polylineLayer.clearLayers();

      return () => {
        map.removeLayer(markerLayer);
      };

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, offers, selectedOfferId]);

  return (
    <section
      className={`${layout === 'main' ? 'cities__map' : 'offer__map'} map`}
      ref={mapRef}
    />
  );
}

export default Map;
