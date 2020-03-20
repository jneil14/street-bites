import React, { useState, useRef } from "react";
import useSwr from "swr";
import GoogleMapReact from "google-map-react";
// import useSupercluster from "use-supercluster";
import truckMarker from "../assets/logo/truck-marker.png";
// import "./App.css";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const Marker = ({ children }) => children;

export default function Mapper() {
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);

  const url =
    "https://cors-anywhere.herokuapp.com/http://data.streetfoodapp.com/1.1/schedule/vancouver";
  const { data, error } = useSwr(url, { fetcher });
  const trucks = data && !error ? data : [];
 console.log("From Mapper: data", Object.entries(trucks))
  
return (
  <div style={{ height: "100vh", width: "100%" }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyAU9E2Ez3NKGq19WK8dN-XVxP23F1-8IpA" }}
      defaultCenter={{ lat: 49.246292, lng: -123.116226 }}
      defaultZoom={10}
    >
      {/* {trucks.map(truck => {
        <Marker
          key={truck.name}
          lat={truck.last.latitude}
          lng={truck.last.longitude}
        >
          <button className="truck-marker">
            <img src={truckMarker} alt="crime doesn't pay" />
          </button>
        </Marker>;
      })} */}
    </GoogleMapReact>
  </div>
);


}