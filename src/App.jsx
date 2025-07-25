// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HouseList from './components/HouseList';
import HouseDetail from './components/HouseDetail';

const App = () => {
import React from 'react';
import Home from './Pages/home';


function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Router>
        <Routes>
          <Route path="/" element={<HouseList />} />
          <Route path="/details/:id" element={<HouseDetail />} />
        </Routes>
      </Router>
    <div className="font-sans">
      <Home />
    </div>
  );
};
export default App;
  );
}

export default App;

