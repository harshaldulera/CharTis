import React, { useState } from "react";

const accessToken = import.meta.env.VITE_APP_MAPBOX_API;

const MapboxSearchBox = ({ accessToken }) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
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
        <div className="search-box">
            <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>

                <ul>
                    {searchResults.map((results, index) => (
                        <li key={index}>
                            {results.name} ({results.coordinates.join(", ")})
                            </li>
                    ))}
                </ul>
        </div>
    );

};

export default MapboxSearchBox;