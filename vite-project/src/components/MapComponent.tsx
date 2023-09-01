import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxAccessToken = import.meta.env.VITE_APP_MAPBOX_API;

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);

  const lng = -70.9;
  const lat = 42.35;
  const zoom = 9;

  useEffect(() => {
    if (!mapContainer.current) return;

    // Check for WebGL support
    if (!mapboxgl.supported()) {
      mapContainer.current.innerHTML = 'WebGL is not supported by your browser.';
      return;
    }

    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
        accessToken: mapboxAccessToken, // Set the accessToken here
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
    <div style={{ width: '100%', height: '100%' }}>
      <div ref={mapContainer} className="map-container" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default MapComponent;
