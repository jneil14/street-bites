import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Map from "./Map";
import sampleTruck from "../assets/images/sample-food-truck.jpeg";
import unavailable from "../assets/logo/unavailable.jpg";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import GoogleMapReact from 'google-map-react';
import truckMarker from "../assets/logo/truck-marker.png";
import favoriteIcon from "../assets/icons/favorite.png";
import axios from "axios";


const AnyReactComponent = ({ text }) => <div>{text}</div>;
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

const saveFavorites = (event, identifier) => {
  axios.post("http://localhost:5000/api/favorites", {identifier}).then(
    respond => {
      console.log(respond.data)
      if(!respond.data) {
        console.log("Food truck is saved already!")
      }
    
    }  
  )
} 



const MapMarker = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 49.267132, lng: -122.968941 }}
        className="map"
      >
        {/* {Object.keys(props.markers).map(marker => {
          const onClick = props.onClick.bind(this, props.markers[marker]); */}
        {/* return ( */}
        <Marker
          key={"name"}
          // onClick={onClick}
          position={props.position}
          icon={{
            url: truckMarker,
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        >
          {/* {props.selectedMarker === props.markers[marker] && ( */}
          {/* <InfoWindow>
              <div className="selected__marker">
                <h4 className="selected__marker-name">
                  {"name"}
                </h4>
                <p className="marker__description">
                  {"props.markers[marker].description_short"}
                </p>
                <p className="rank">{"props.markers[marker].rank"}</p>
              </div>
            </InfoWindow> */}
        </Marker>
      </GoogleMap>
    );
  })
);



const Details = ({ vendors, match, closeModalNow }) => {
  

  let actualVendors = [];
  let vendorsSet = false;

  if (vendors !== undefined) {
    // actualVendors = [vendors.vendors];
    // console.log("vendors.vendors", vendors.vendors);
    for (let item in vendors.vendors) {
      actualVendors.push(vendors.vendors[item]);
    }
    // console.log("actual vendors", actualVendors);
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

  console.log(actualVendors.length);

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
        // let truckImages = truck.images.header.map(image =>{
        //   return image
        // })
        let hours = "";
        let startHours = "";
        let endHours = "";
        if (truck.open.length !== 0) {
          console.log(truck.open);

          let start = new Date(truck.open[0].start * 1000);
          console.log(start);
          startHours = start.getHours();
          let end = new Date(truck.open[0].end * 1000);
          endHours = end.getHours();
        } else {
          if(truck.last) {
            let date = new Date(truck.last.time * 1000);
            hours = date.getHours();
          }
          else {
            hours = "Hours not available";
          }
        }



        return (
          <>
            <button className="close-btn" onClick={closeModalNow}>
              close
            </button>
            {/* <Map /> */}
            <div className="details">
              <div className="details__card">
                <button onClick={(event) => saveFavorites(event, truck.identifier)} className="details__fav-btn">favoriteIcon</button>
                <div className="details__card-segment">
                  <h3 className="details__card-segment-name">{truck.name}</h3>
                  <img
                    className="details__card-segment-logo"
                    src={truck.images ? truck.images.header[0] : unavailable}
                    // src={truckImages}
                    alt="food truck logo"
                  />
                </div>
                <div className="details__card-segment">
                  <h4 className="details__card-segment-address">
                    {truck.last.display}
                  </h4>
                  <p className="details__card-segment-hours">
                    {startHours
                      ? `Hours: ${startHours} to ${endHours}`
                      : `Hours: ${hours} --`}
                  </p>
                </div>

                <div className="details__card-segment">
                  <p className="details__card-segment-phone">
                    Phone: {truck.phone}
                  </p>
                  <p className="details__card-segment-website">
                    Website: {truck.url ? truck.url : "(Website not available)"}
                  </p>
                  <p className="details__card-segment-email">
                    Email: {truck.email ? truck.email : "(Email not available)"}
                  </p>
                </div>

                <div className="details__card-segment">
                  <p className="details__card-segment-payment">
                    Payment Method: {truck.payment_methods}
                  </p>
                  <p className="details__card-segment-rank">
                    Rank: {truck.rank}
                  </p>
                </div>
                <div className="details__card-segment">
                  <p className="details__card-segment-description">
                    {truck.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="details__map">

            {
              <MapMarker
                className="map"
                position={{
                  lat: truck.last.latitude,
                  lng: truck.last.longitude
                }}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAU9E2Ez3NKGq19WK8dN-XVxP23F1-8IpA&libraries=places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                  <div
                    style={{
                      height: `150px`,
                      border: `1px solid grey `,
                      // margin: `1rem`
                    }}
                  />
                }
                mapElement={<div style={{ height: `100%` }} />}
              />
            }
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
