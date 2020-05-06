import React from "react";
import unavailable from "../assets/logo/unavailable.jpg";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker 
} from "react-google-maps";
import truckMarker from "../assets/logo/truck-marker.png";
import axios from "axios";


const saveFavorites = (event, identifier) => {
  axios.post("http://localhost:5000/api/favorites", {identifier}).then(
    respond => {
      if(!respond.data) {
        alert("Food truck has already been saved!")
      }
    
    }  
  )
} 



const MapMarker = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 49.267132, lng: -122.968941 }}
        className="map"
      >
       
        <Marker
          key={"name"}
          position={props.position}
          icon={{
            url: truckMarker,
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        >
         
        </Marker>
      </GoogleMap>
    );
  })
);



const Details = ({ vendors, match, closeModalNow }) => {
  let actualVendors = [];
  let vendorsSet = false;

  if (vendors !== undefined) {
    actualVendors = [vendors.vendors];
    for (let item in vendors.vendors) {
      actualVendors.push(vendors.vendors[item]);
    }
    vendorsSet = true;
  }

const goToUrl = (event, url) => {
  window.location.assign(url);
}

  if (vendors !== undefined) {
    if (vendors.vendors !== undefined) {

      const found = actualVendors.some(truck => {
        return truck.identifier === match.params.identifier;
      });

      if (found) {
        const truck = actualVendors
          .filter(truck => truck.identifier === match.params.identifier)
          .shift();
        let hours = "";
        let startHours = "";
        let endHours = "";
        if (truck.open.length !== 0) {
      
          let start = new Date(truck.open[0].start * 1000);
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

            <div className="details">
              <div className="details__card">
                <button
                  onClick={event => saveFavorites(event, truck.identifier)}
                  className="details__fav-btn"
                >
                  Save Food Truck
                </button>
                <div className="details__card-segment">
                  <h3 className="details__card-segment-name">{truck.name}</h3>
                  <img
                    className="details__card-segment-logo"
                    src={
                      truck.images
                        ? truck.images.logo || truck.images.header[0]
                        : unavailable
                    }
                    alt="food truck logo"
                  />
                </div>
                <div className="details__card-segment">
                  <h4 className="details__card-segment-address">
                    {truck.last ? truck.last.display : "(Address not available"}
                  </h4>
                  <p className="details__card-segment-hours">
                    {startHours
                      ? `Hours: ${startHours} to ${endHours}`
                      : `Hours: ${hours} - (closing time not available)`}
                  </p>
                </div>

                <div className="details__card-segment">
                  <p className="details__card-segment-phone">
                    Phone:
                    {truck.phone ? truck.phone : "(Phone number not available)"}
                  </p>
                  <p className="details__card-segment-website">
                    Website:
                    {truck.url ? (
                      <button
                        className="details__card-segment-url"
                        onClick={event =>
                          goToUrl(event, `http://www.${truck.url}`)
                        }
                      >
                        {truck.url}
                      </button>
                    ) : (
                      "(Website not available)"
                    )}
                  </p>
                  <p className="details__card-segment-email">
                    Email: {truck.email ? truck.email : "(Email not available)"}
                  </p>
                </div>

                <div className="details__card-segment">
                  <p className="details__card-segment-payment">
                    Payment Method:
                    {truck.payment_methods
                      ? ` ${Object.values(truck.payment_methods)
                          .join(", ")
                          .slice(0)
                          .replace("_", " ")
                          .replace("_", " ")
                          .replace("_", " ")} `
                      : "(Sorry,  not available)"}
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
                    lat: truck.last && truck.last.latitude,
                    lng: truck.last && truck.last.longitude
                  }}
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={
                    <div
                      style={{
                        height: `250px`,
                        width: `100%`,
                        border: `1px solid grey `,
                        margin: `auto`
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
