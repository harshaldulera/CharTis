import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Import Leaflet Routing Machine CSS
import "leaflet-routing-machine";
import "../styles/Home.css";

function Home() {
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(72.87);
    const [lat, setLat] = useState(19.07);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        const map = L.map(mapContainer.current).setView([lat, lng], zoom);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.control.scale().addTo(map); 
        L.Routing.control({
            waypoints: [
                L.latLng(lat, lng), 
            ],
            routeWhileDragging: true,
        }).addTo(map);


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
