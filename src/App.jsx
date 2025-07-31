import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import HouseDetail from './components/HouseDetail';
import HomePage from './Pages/home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Router>   
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties/:id" element={<HouseDetail />} />
        </Routes>
        <Footer/>
      </Router>   
    </div>
  )
  }

  export default App
  
