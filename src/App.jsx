// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HouseList from './components/HouseList';
import HouseDetail from './components/HouseDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HouseList />} />
        <Route path="/details/:id" element={<HouseDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
