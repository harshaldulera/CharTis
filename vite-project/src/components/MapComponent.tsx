import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SearchBox } from './floating-components/SearchBox';

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

  const mapStyle = {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  };

  const searchBoxStyle = {
    position: 'absolute',
    display: 'flex',
    top: '10px',
    left: '10px',
    zIndex: 1,
  };

  return (
    <div style={mapStyle}>
      <SearchBox accessToken={mapboxAccessToken} style={searchBoxStyle} />
      <div ref={mapContainer} className="map-container" style={mapStyle} />
    </div>
  );
};

export default MapComponent;