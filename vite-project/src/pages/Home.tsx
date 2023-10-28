import React from 'react';
import MapComponent from '../components/MapComponent';
import Sidenav from '../components/Navbar/Sidenav';
import MapboxSearchBox from '../components/Searchbox';

const mapboxAccessToken = import.meta.env.VITE_APP_MAPBOX_API;

function Home() {
    return (
        <div>
            <MapComponent />
            <div className='sidebar' style={{
                position: 'absolute',
                top: '0',
                left: '0',
                height: '100vh',
            
            }}>
                <Sidenav />
            </div>
            <MapboxSearchBox accessToken={mapboxAccessToken} />
        </div>
    );
}

export default Home;