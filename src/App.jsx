// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import HouseDetail from './components/HouseDetail';
import HomePage from './Pages/home';
import Header from './components/Header';


function App() {
  return (
    <div>
      
      <Router>   
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:id" element={<HouseDetail />} />
        </Routes>
      </Router>   
    </div>
  )
  }

  export default App
  
