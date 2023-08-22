import React, { useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Home() {
  useEffect(() => {
    // Create a map centered at a specific location (e.g., Ghatkopar)
    const map = L.map('map').setView([19.0896, 72.9806], 12);

    // Add a tile layer to the map (using OpenStreetMap tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Add a marker at the center of the map
    L.marker([19.0896, 72.9806]).addTo(map)
      .bindPopup('Ghatkopar')
      .openPopup();
  }, []);

  return (
    <div>
      <h2>Google Maps Clone using Leaflet</h2>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}

export default Home;
