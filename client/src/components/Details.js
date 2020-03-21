import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Map from "./Map";
import sampleTruck from "../assets/images/sample-food-truck.jpeg";

// export default class Details extends Component {
//   constructor(props) {
//     super(props);
//   }

//     render() {
//         return (
//           <>
{
  /* <button className="close-btn" onClick={this.props.closeModalNow}>
             close
            </button>
            <Header /> */
}
{
  /* <Map /> */
}
{
  /* <div className="foodtrucks">
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
            </div> */
}

//           </>
//         );
//     }
// }

const Details = ({ vendors, match, closeModalNow }) => {
  console.log(match);

  let actualVendors = [];
  let vendorsSet = false;

  if (vendors !== undefined) {
    // actualVendors = [vendors.vendors];
    console.log("vendors.vendors", vendors.vendors);
    for (let item in vendors.vendors) {
      actualVendors.push(vendors.vendors[item]);
    }
    console.log("actual vendors", actualVendors);
    vendorsSet = true;
  }

  // let hours = "";
  // let startHours = "";
  // let endHours = "";
  // if (vendors.open.length !== 0) {
  //   console.log(typeof vendors.open[0].start);

  // vendors.open.map(time => {
  //   let start = new Date(time.start);
  //   startHours = start.getHours();
  //   let end = new Date(time.end);
  //   endHours = end.getHours();
  // })
  //   let start = new Date(array[1].open[0].start * 1000);
  //   console.log(start);
  //   startHours = start.getHours();
  //   let end = new Date(array[1].open[0].end * 1000);
  //   endHours = end.getHours();
  // } else {
  //   let date = new Date(array[1].last.time * 1000);
  //   hours = date.getHours();
  // }

  // console.log(actualVendors.length);

  if (vendors !== undefined) {
    if (vendors.vendors !== undefined) {
      console.log("params identifier", match.params.identifier);
      console.log("actualVendors", actualVendors);

      const found = actualVendors.some(truck => {
        // console.log(truck.identifier == match.params.identifier);
        return truck.identifier == match.params.identifier;
      });
      // console.log("found", found);

      if (found) {
        const truck = actualVendors
          .filter(truck => truck.identifier === match.params.identifier)
          .shift();

        return (
          <>

            <button className="close-btn" onClick={closeModalNow}>
              close
            </button>
            {/* <Map /> */}
            <div className="details">
              <div className="details__card">
                <div className="details__card-segment">
                  <h3 className="details__card-segment-name">{truck.name}</h3>
                  <img
                    className="details__card-segment-logo"
                    src={truck.images.logo ? truck.images.logo : sampleTruck}
                    alt="food truck logo"
                  />
                </div>
                <div className="details__card-segment">
                  <h4 className="details__card-segment-address">
                    {truck.last.display}
                  </h4>
                  <h4 className="details__card-segment-hours">
                    9 a.m. - 10 p.m.
                  </h4>
                </div>
                <div className="details__card-segment">
                  <h4 className="details__card-segment-payment">
                    {truck.payment_methods}
                  </h4>
                  <h4 className="details__card-segment-rank">
                    Rank: {truck.rank}
                  </h4>
                </div>
                <div className="details__card-segment">
                  <p className="details__card-segment-description">
                    {truck.description}
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        return <p>Truck not found</p>;
      }
    }
  } else {
    return <div>Loading</div>;
  }
};

export default Details;
