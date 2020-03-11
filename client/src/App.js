import React from 'react';
import './styles/main.css';
import Header from './components/Header';
import Map from "./components/Map";
import Foodtrucks from "./components/Foodtrucks";

function App() {
  return (
    <div className="App">
      <Header />
      <Map />
      <Foodtrucks />
    </div>
  );
}

export default App;
