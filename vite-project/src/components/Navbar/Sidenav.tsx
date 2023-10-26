import React, { useState } from "react";
import MapComponent from "../MapComponent";

const Sidenav = () => {
    const [open, setIsopen] = useState(false);
    const ToggleSidenav = () => {
        setIsopen === true ? setIsopen(false) : setIsopen(true);
    }

    return (
        <>
        </>
    )
}

export default Sidenav;