import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage/loginPage";
import InstitutionPage from "./pages/institutionPage/institutionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/institutionPage" element={<InstitutionPage />} />
        <Route path="/404" element={<div>page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
