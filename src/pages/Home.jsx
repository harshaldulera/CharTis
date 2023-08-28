import mapboxgl from "mapbox-gl";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import React, { useEffect, useRef, useState } from "react";
import '../styles/Home.css';
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

function Home() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(72.87);
    const [lat, setLat] = useState(19.07);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        // Create a new map when the component mounts
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: zoom,
        });

        // Add controls and directions here as you did before
        map.current.addControl(new mapboxgl.NavigationControl());
        map.current.addControl(new mapboxgl.FullscreenControl());
        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            })
        );
        map.current.addControl(
            new MapboxDirections({
                accessToken: mapboxgl.accessToken,
            }),
            "top-left"
        );

        // Event listener for map move
        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        // Cleanup when the component unmounts
        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, [lng, lat, zoom]);

    return (
        <div className="App">
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default Home;
