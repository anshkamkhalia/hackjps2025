import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Homepage from './homepage';
import Bot from './Botpage' 
import CountryDetailsPage from './map.jsx'; 
import MyPlacesPage from './MyPlacesPage.jsx';
import HomePage from './loginhome.jsx';
import WeatherTestPage from './WeatherTestPage';
import ComparePlacesPage from './ComparePlacesPage.jsx';
import FlightBot from './FlightBot.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bot" element={<Bot />} />
      <Route path='/map' element={<CountryDetailsPage />}/>
      <Route path='/my-places' element={<MyPlacesPage />}/>
      <Route path='/login-home' element={<HomePage />}/>
      <Route path='/weather-test' element={<WeatherTestPage />} />
      <Route path="/compare-places" element={<ComparePlacesPage />} />
      <Route path="/deal-finder" element={<FlightBot />} />
    </Routes>
  );
};

export default App;