import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import "./styles/app.css";
import Home from "./pages/Home";
import Sidenav from "./components/Navbar/Sidenav";

function App() {
  return (
    <div>
      <div className="content">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sidenav" element={<Sidenav />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;