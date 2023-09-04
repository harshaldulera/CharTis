import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import MapboxSearchBox from './floating-components/MapboxSearchBox';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/components/floating-components/SearchBox.css';

const mapboxAccessToken = import.meta.env.VITE_APP_MAPBOX_API;

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);

  const lng = 72.90;
  const lat = 19.07;
  const zoom = 9;

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!mapboxgl.supported()) {
      mapContainer.current.innerHTML = 'Your browser does not support Mapbox GL';
      return;
    }

    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
        accessToken: mapboxAccessToken,
      });

      setMap(newMap);
    };

    if (!map) {
      initializeMap();
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map, lat, lng, zoom]);

  return (
    <div className='main'>
      <div ref={mapContainer} className="map-container" />
      <MapboxSearchBox accessToken={mapboxAccessToken} />
    </div>
  );
};

export default MapComponent;  