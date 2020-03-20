import React, { Component } from 'react'
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import truckMarker from "../assets/logo/truck-marker.png";

const MapMarker = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 49.246292, lng: -123.116226 }}
      >
        {Object.keys(props.markers).map(marker => {
          const onClick = props.onClick.bind(this, props.markers[marker]);

          return (
            <Marker
              key={props.markers[marker].name}
              onClick={onClick}
              position={{
                lat:
                  props.markers[marker].last &&
                  props.markers[marker].last.latitude,
                lng:
                  props.markers[marker].last &&
                  props.markers[marker].last.longitude
              }}
              
              icon={{
                url: truckMarker,
                scaledSize: new window.google.maps.Size(35, 40)
              }}
            >
              {props.selectedMarker === props.markers[marker] && (
                <InfoWindow>
                  <div className="selected__marker">
                    <h4 className="selected__marker-name">
                      {props.markers[marker].name}
                    </h4>
                    <p className="marker__description">
                      {props.markers[marker].description_short}
                    </p>
                    <p className="rank">Rank: {props.markers[marker].rank}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    );
  })
);
// const MapMarker = compose(withScripts, withGoogleMap) (props => {
//     return (
//         <GoogleMap defaultZoom={10} defaultCenter={{ lat: 49.246292, lng: -123.116226 }}>
//             {Object.keys(props.markers).map(marker => {
//                 const onClick = props.onClick.bind(this, props.markers[marker]);

//                 return (
//                     <Marker 
//                     key = {props.markers[marker].name}
//                     onClick = {onClick}
//                     position = {{ lat: props.markers[marker].last && props.markers[marker].last.latitude,
//                     lng: props.markers[marker].last && props.markers[marker].last.longitude }}
//                     >
//                       { props.selectedMarker === props.markers[marker] && (<InfoWindow>
//                           <div> <img className="marker" src={truckMarker} alt="marker" />  {props.markers[marker].name} </div>
//                       </InfoWindow>)}  
//                     </Marker>
//                 )
//             })}
//         </GoogleMap>
//     )
// });



export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markerInfo: this.props.info,
            selectedMarker: false
        }
    }

    handleClick = (marker, event) => {
        this.setState({
            selectedMarker: marker
        });
    }
    render() {
        return (
          <MapMarker
            selectedMarker={this.state.selectedMarker}
            markers={this.props.info}
            onClick={this.handleClick}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAU9E2Ez3NKGq19WK8dN-XVxP23F1-8IpA&libraries=places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        );
    }
}
