import React from "react";
import "./styles/cebutech.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentsPage from "./pages/StudentsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
