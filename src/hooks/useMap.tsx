import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';

import { TILE_LAYER, COPYRIGHT } from '../config';

import { City } from '../types/city';
import { Nullable } from 'vitest';


function useMap(
  mapRef: MutableRefObject<Nullable<HTMLElement>>,
  city: City
): Nullable<Map> {

  const [map, setMap] = useState<Nullable<Map>>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(
        TILE_LAYER,
        {
          attribution: COPYRIGHT,
        },
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
