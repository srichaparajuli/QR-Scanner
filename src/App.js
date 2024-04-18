import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Qr from "../src/Components/QRGenerator/Qr";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Qr />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
