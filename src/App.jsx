import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import "./styles/App.css";
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();

  return(
    <Router>
      <div>
        <div className="conten">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;