import React from 'react';
import MapComponent from '../components/MapComponent';
import Sidenav from '../components/Navbar/Sidenav';
import MapboxSearchBox from '../components/Searchbox';

const mapboxAccessToken = import.meta.env.VITE_APP_MAPBOX_API;

function Home() {
    return (
        <div>
            <MapComponent />
            <Sidenav />
            <MapboxSearchBox accessToken={mapboxAccessToken} />
        </div>
    );
}

export default Home;