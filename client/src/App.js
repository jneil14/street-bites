import React, { Component } from "react";
import "./styles/main.css";
import axios from "axios";
import Header from "./components/Header";
import Map from "./components/Map";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewTrucks from "./components/NewTrucks";
import Foodtrucks from "./components/Foodtrucks";
import AllTrucks from "./components/AllTrucks";
import Favorites from "./components/Favorites";
import Details from "./components/Details";

// import Roulettes from "./components/Roulettes

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
    if (!this.state.info) return <h1> Loading..</h1>;

    return (
      <Router className="App">
        <Header />
        {/* <Map info={this.state.info.vendors} /> */}

        {/* <TruckMap info={this.state.info.vendors} /> */}

        <Switch>
          <Route
            path={`/new`}
            render={routerProps => (
              <NewTrucks info={this.state.info} {...routerProps} />
            )}
          />

          <Route
            path={`/alltrucks`}
            render={routerProps => (
              <AllTrucks info={this.state.info} {...routerProps} />
            )}
          />


          <Route
            path={`/favorites`}
            render={routerProps => (
              <Favorites info={this.state.info} {...routerProps} />
            )}
          />
          <Route
            path={`/`}
            render={routerProps => (
              <Foodtrucks info={this.state.info} {...routerProps} />
            )}
          />
        </Switch>
        {/* <Foodtrucks info={this.state.info} /> */}
        {/* <Details info={this.state.info} /> */}

        {/* <Roulettes /> */}
      </Router>
    );
  }
}

export default App;
