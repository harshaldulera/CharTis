import React, { useRef, useEffect }from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
improt MapboxSearchBox from 'mapbox-searchbox';

const MapboxSearch = ({ accessToken }) => {
    const mapContainer = useRef(null);
    
    useEffect(() => {
        if (!mapContainer.current) return;

        mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_API;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [72.90, 19.07],
            zoom: 2,
        });

        const searchBox = new MapboxSearchBox();
        searchBox.accessToken = accessToken
        map.addControl(searchBox);

        return () => {
            map.remove();
        };

    }, [accessToken]);

    return <div ref={mapContainer} className="map-container" />;
}


export default MapboxSearchBox;