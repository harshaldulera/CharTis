import React, { useState } from "react";

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
        <div className="search-box">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <div className="search-results">
            <ul>
              {searchResults.map((result) => (
                <li key={result.id}>{result.place_name}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    };

export default MapboxSearchBox;