// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HouseList from './components/HouseList';
import HouseDetail from './components/HouseDetail';
import Home from './Pages/home';


function App() {
  return (
    <div>
      <Router>
           <Home />
        <Routes>
          <Route path="/" element={<HouseList />} />
          <Route path="/details/:id" element={<HouseDetail />} />
        </Routes>
      </Router>
    
    </div>
  )
  }

  export default App
  
