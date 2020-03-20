import React, { Component } from "react";
import "./styles/main.css";
import axios from "axios";
import Header from "./components/Header";
import Map from "./components/Map";


import Foodtrucks from "./components/Foodtrucks";

// import Roulettes from "./components/Roulettes";





class App extends Component {
  state = {
    info: undefined
  };

  
  // API_KEY
// const apiKey = "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo";

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://data.streetfoodapp.com/1.1/schedule/vancouver"
      )
      .then(res => {
        this.setState({
          info: res.data
        });
        console.log(res);
      });
  }



  render() {
    if(!this.state.info) return <h1> Loading..</h1>

    return (
      <div className="App">
        <Header />
        <Map info={this.state.info.vendors}/>
        
        {/* <TruckMap info={this.state.info.vendors} /> */}
        
        <Foodtrucks info={this.state.info} /> */}
        

        {/* <Roulettes /> */}
        
      </div>
    );
  }
}

export default App;
