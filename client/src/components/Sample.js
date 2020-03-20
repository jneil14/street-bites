import React, { Component } from "react";
import { compose } from "recompose"; 
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";


const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props => {
    
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 49.246292, lng: -123.116226 }}
    >
      {Object.keys(props.markers).map(marker => {
        const onClick = props.onClick.bind(this, props.markers[marker]);
        // console.log(props.markers[marker].last);
        return (
          <Marker
            key={props.markers[marker].name}
            onClick={onClick}
            position={{
              lat:
                props.markers[marker].last &&
                props.markers[marker].last.latitude,
              lng:
                props.markers[marker].last && props.markers[marker].last.longitude
            }}
          >
            {props.selectedMarker === props.markers[marker] && (
              <InfoWindow>
                <div>{props.markers[marker].name}</div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default class ShelterMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelters: this.props.info,
      selectedMarker: false
    };
  }
//   componentDidMount() {
//     fetch(
//       "http://data.streetfoodapp.com/1.1/schedule/vancouver"
//     )
//       .then(r => r.json())
//       .then(data => {
//         console.log("data from api", data)
//         this.setState({ shelters: data.shelters });
//       });
//   }

  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker });
  };
  render() {
      console.log(this.state.shelters);
      
    return (
      <MapWithAMarker
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
