import React, { Component } from "react";
// import React, {useState} from 'react'
// import Roulette from "react-roulette";
import Details from "./Details";
import ReactModal from "react-modal";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Roulette from "react-roulette-game";


// import highlight_img from "./images/hightlight.png";
// import pointer_img from "./images/pointer.png";
// import roulette_img_under_highlight from "./images/rou_under_high.png";
// import roulette_img_on_highlight from "./images/rou_on_high.png";



const DemoComp = () => (
  <div className="game-box">
    
    
    <Roulette {...roulette_props} /> 
    
  </div>
);

const roulette_props = {
//   roulette_img_under_highlight,
//   roulette_img_on_highlight,
//   highlight_img,
//   pointer_img,
  prize_arr: [
    "Baseball",
    "Rugby",
    "Tennis",
    "Soccer",
    "Badminton",
    "Basketball"
  ]
};


export default DemoComp











// export default class Roulettes extends Component {
//   state = {
//     showModal: false
//   };

//   handleOpenModal = () => {
//     console.log("modal");
//     this.setState({ showModal: true });
//   };

//   handleCloseModal = () => {
//     this.setState({ showModal: false });
//     // window.location.pathname = "/foodtrucks";
//     return <Redirect to="/new" />;
//     console.log("modal");
//   };

//   render() {
//     let items = this.props.vendors.map(vendor => vendor.identifier);

//     const colors = ["#EAECEF", "#FBD1A2", "#BED558", "#F76156", "#FBF2DA"];

//     const handleRouletteChange = foodtruck => {
//       console.log(foodtruck);
//     };

//     return (
//       <>
//         <div className="roulette">
//           <div className="roulette__body">
//             <h1 className="roulette__body-title">Food Truck Roulette</h1>
//             <Roulette
//               // onChange={this.handleRouletteChange}
//               items={items}
//               colors={colors}
//             />
//           </div>
//           <div className="roulette__selected">
//             <div className="roulette__selected-list">
//               {items.map((vendor, index) => (
//                 // <li className={`roulette__selected-list-${index}`}>
//                 //   {" "}
//                 //   {vendor}
//                 // </li>
//                 <a
//                   href="#"
//                   className={`roulette__selected-list-${index}`}
//                   onClick={this.handleOpenModal}
//                 >
//                   <Link to={`/new/${vendor}`} key={vendor}>
//                     {vendor}
//                   </Link>
//                 </a>
//                 // <button onClick={this.handleOpenModal}>{vendor}</button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <ReactModal
//           ariaHideApp={false}
//           isOpen={this.state.showModal}
//           contentLabel="Minimal Modal Example"
//         >
//           <Route
//             path={`/new/:identifier`}
//             render={routerProps => (
//               <Details
//                 vendors={this.props.filteredData}
//                 closeModalNow={this.handleCloseModal}
//                 {...routerProps}
//               />
//             )}
//           />
//         </ReactModal>
//       </>
//     );
//   }
// }

// function Roulettes (props) {
//     let items = props.vendors.map(vendor => vendor.identifier)

//     const colors = ["#EAECEF", "#FBD1A2", "#BED558", "#F76156", "#FBF2DA"];

//   const handleRouletteChange =(foodtruck) => {
//     console.log(foodtruck);
//   }

//   const [showModal, setShowModal] = useState(false);

//   const handleOpenModal = e => {
//     setShowModal(true)
//     console.log(e)
//   };

//   const handleCloseModal = (e) => {
//     setShowModal(false)
//     // window.location.pathname = "/foodtrucks";
//     return <Redirect to="/new" />;
//     console.log(e);
//   };

//     return (
//       <>
//         <div className="roulette">
//           <div className="roulette__body">
//             <h1 className="roulette__body-title">Food Truck Roulette</h1>
//             <Roulette
//               onChange={handleRouletteChange}
//               items={items}
//               colors={colors}
//             />
//           </div>
//           <div className="roulette__selected">
//             <div className="roulette__selected-list">
//               {items.map((vendor, index) => (
//                 // <li className={`roulette__selected-list-${index}`}>
//                 //   {" "}
//                 //   {vendor}
//                 // </li>
//                 <a
//                   href="#"
//                   className={`roulette__selected-list-${index}`}
//                   onClick={event => handleOpenModal(event)}
//                 >
//                   <Link
//                     to={`/new/${vendor}`}
//                     key={vendor}
//                   >
//                     {vendor}
//                   </Link>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         <ReactModal
//           ariaHideApp={false}
//           isOpen={showModal}
//           contentLabel="Minimal Modal Example"
//         >
//           <Route
//             path={`/new/:identifier`}
//             render={routerProps => (
//               <Details
//                 vendors={props.filteredData}
//                 closeModalNow={event => handleCloseModal(event)}
//                 {...routerProps}
//               />
//             )}
//           />
//         </ReactModal>
//       </>
//     );
// }

// export default Roulettes
