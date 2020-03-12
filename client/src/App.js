import React, { Component } from 'react';
import './styles/main.css';
import Header from './components/Header';
import Map from "./components/Map";
import Foodtrucks from "./components/Foodtrucks";
import Roulettes from './components/Roulettes';


class App extends Component {



  render() {
    return (
      <div className="App">
        <Header />
        <Map />
        <Foodtrucks />
        
        {/* <Roulettes /> */}
      </div>
    );
  }
}

export default App;


