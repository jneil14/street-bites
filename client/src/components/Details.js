import React, { Component } from 'react'
import Header from "./Header";
import Map from "./Map";
import sampleTruck from "../assets/images/sample-food-truck.jpeg";


export default class Details extends Component {
  constructor(props) {
    super(props);
  }

    render() {
        return (
          <>
            <button className="close-btn" onClick={this.props.closeModalNow}>
             close
            </button>
            <Header />
            <Map />
            <div className="foodtrucks">
              <div className="foodtrucks__card">
                <div className="foodtrucks__card-segment">
                  <h3 className="foodtrucks__card-segment-name">
                    Dahbest Foodtruck
                  </h3>
                  <img
                    className="foodtrucks__card-segment-logo"
                    src={sampleTruck}
                    alt="food truck logo"
                  />
                </div>
                <div className="foodtrucks__card-segment">
                  <h4 className="foodtrucks__card-segment-address">
                    455 Granville
                  </h4>
                  <h4 className="foodtrucks__card-segment-hours">
                    9 a.m. - 10 p.m.
                  </h4>
                </div>
                <div className="foodtrucks__card-segment">
                  <h4 className="foodtrucks__card-segment-payment">
                    Cards? accepted
                  </h4>
                  <h4 className="foodtrucks__card-segment-rank">Rank: 1</h4>
                </div>
                <div className="foodtrucks__card-segment">
                  <p className="foodtrucks__card-segment-description">
                    Yummiest food truck in the Whole Wide World
                  </p>
                </div>
              </div>
            </div>
          </>
        );
    }
}
