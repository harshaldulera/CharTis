import React, { useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Home() {
    useEffect(() => {
        const map = L.map('map').setView([19.0896, 72.9806], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }, []);

    return(
        <div>
            <h2>Leaflet map example</h2>
            <div id="map" style={{ width: '100%', height: '500px' }}>
            </div>
        </div>
    );
}

export default Home;