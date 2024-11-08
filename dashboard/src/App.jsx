import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, MotionConfig } from "framer-motion";
import Userdashboard from "./conponents/maindashboard/userdashboard";
import HotelDetails from "./conponents/hotelinfo/hotelDetails";

function MainContent() {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Userdashboard />} />
        <Route path="/campaigns/:hotelId" element={<HotelDetails />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
        <div className="app">
          <MainContent />
        </div>
      </MotionConfig>
    </Router>
  );
}

export default App;
