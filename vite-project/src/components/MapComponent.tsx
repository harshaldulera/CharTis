import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button, Paper, Typography } from '@mui/material';

const mapboxAccessToken = import.meta.env.VITE_APP_MAPBOX_API;

const MapComponent = () => {


    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 10,
    });

    const [marker, setMarker] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        name: "Hello",
    });

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        function handleResize() {
            setViewport((prevViewport) => ({
                ...prevViewport,
                width: window.innerWidth,
                height: window.innerHeight,
            }));
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                mapboxApiAccessToken={mapboxAccessToken}
            >
                {/* Marker */}
                <Marker
                    latitude={marker.latitude}
                    longitude={marker.longitude}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowPopup(true)}
                    >
                        {marker.name}
                    </Button>
                </Marker>

                {/* Popup */}
                {showPopup && (
                    <Popup
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                        onClose={() => setShowPopup(false)}
                    >
                        <Paper elevation={3} style={{ padding: "10px" }}>
                            <Typography variant="h6">{marker.name}</Typography>
                        </Paper>
                    </Popup>
                )}
            </ReactMapGL>
        </div>
    );
};

export default MapComponent;