import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/Home.css";

function Home() {
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(72.87);
    const [lat, setLat] = useState(19.07);
    const [zoom, setZoom] = useState(9);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const map = L.map(mapContainer.current, {
            center: [lat, lng],
            zoom: zoom,
            dragging: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const newMarker = L.marker([lat, lng], {
            draggable: true,
        }).addTo(map);

        newMarker.bindPopup("Drag me!");
        
        newMarker.on("drag", (event) => {
            const { lat, lng } = event.target.getLatLng();
            setLat(lat.toFixed(4));
            setLng(lng.toFixed(4));
        });

        setMarker(newMarker);

        map.on("move", () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [lng, lat, zoom]);

    return (
        <div className="App">
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" style={{ width: "100%", height: "100vh" }} />
        </div>
    );
}

export default Home;
