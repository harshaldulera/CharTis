import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Paper } from "@mui/material";

const accessToken = import.meta.env.VITE_APP_MAPBOX_API;

const MapboxSearchBox = ({ accessToken }) => {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${accessToken}`
            );

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();

            const results = data.features.map((feature) => ({
                name: feature.text,
                coordinates: feature.center,
            }));

            setSearchResults(results);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <div style={{ position: 'absolute', top: '0', left: '0' }}>
            <form onSubmit={handleSearch} style={{ padding: "16px" }}>
                <TextField
                    type="text"
                    label="Search"
                    fullWidth
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "16px" }}
                        >Search</Button>
                        </form>
                        <div className="search-results">
                        <List>
                            {searchResults.map((result, index) => (
                                <ListItem key={index} button>
                                    <ListItemText primary={result.name} />
                                    </ListItem>
                            ))}
                        </List>
                        </div>
                        </div>
    );
};

export default MapboxSearchBox;