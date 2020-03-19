import React from 'react'
 import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import map from '../assets/images/map.jpg';

// export default class Map extends Component {
//     render() {
//         return (
//           <>
//             <div className="map">
//               <img className="map__image" src={map} alt="map" />
//               <GoogleMap
//                 defaultZoom={10}
//                 defaultCenter={{ lat: 49.246292, lng: -123.116226 }}
//               />
//             </div>
//           </>
//         );
//     }
// }


// const Map = withScriptjs(
//   withGoogleMap(props => (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 49.246292, lng: -123.116226 }}
//     >
    
//     </GoogleMap>
//   ))
// );



function Map() {
    return (

        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: 49.246292, lng: -123.116226 }}
          
        ></GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


export default Map;



