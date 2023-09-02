import { accessToken } from "mapbox-gl";
import React, { useState } from "react";

export function SearchBox({ accessToken }) {
    const [value, setValue] = useState("");

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(value);
    };

return (
    <div className="searchbox">
        <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={handleInputChange}
            placeholder="Search..."
            />
            <button onClick={handleSubmit}>Search</button>
    </div>
    );
}