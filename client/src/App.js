import React, { Component } from "react";
import "./styles/main.css";
import axios from "axios";
import Header from "./components/Header";
import Map from "./components/Map";
// import GoogleMap from "./components/GoogleMap";
import Mapper from "./components/Mapper";
import Foodtrucks from "./components/Foodtrucks";
// import New from "./components/New";
// import Roulettes from "./components/Roulettes";
// import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";


// const WrappedMap = withScriptjs(withGoogleMap(Map));
class App extends Component {
  state = {
    info: []
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
    

    return (
      <div className="App">
        <Header />
        {/* <Map /> */}
        {/* <GoogleMap /> */}
        <Mapper />
        <Foodtrucks info={this.state.info} />
        {/* <New info={this.state.info} /> */}

        {/* <Roulettes /> */}
        {/* <div style={{ width: "100vw", height: "70vh" }}> */}
        {/* <WrappedMap
          googleMapUrl={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "400px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        /> */}
        {/* </div> */}

      </div>
    );
  }
}

export default App;
