import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Select from "react-select";
import unavailable from "../assets/logo/unavailable.jpg";
import ReactModal from "react-modal";
import Details from "./FavoriteDetails";
import Map from "./Map";
import axios from "axios";
import favoriteIcon from "../assets/icons/favorite.png"



const options = [
  {
    value: "featured",
    label: (
      <Link to={"/"} className="options__featured">
        {" "}
        Featured{" "}
      </Link>
    )
  },
  {
    value: "new",
    label: (
      <Link to={"/new"} className="options__new">
        {" "}
        New{" "}
      </Link>
    )
  },
  {
    value: "all",
    label: (
      <Link to={"/alltrucks"} className="options__all">
        
        All
      </Link>
    )
  },
  {value: "favorites", label: (<Link to={"/favorites"} className="options__favorites">Favorites</Link>)}
];

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      showModal: false,
      filteredData: undefined,
      foodTruck: undefined
    };
  }

//   componentWillReceiveProps(prevProps, prevState) {
//     console.log("prevProps", prevProps);
//     this.setState({
//       filteredData: prevProps.info
//     });
//   }

  componentDidMount() {
    
    // this.setState({
    //   filteredData: this.props.info
    // });

    // TODO
    // add axios get request to load favorite food trucks from express
    //
    axios.get("http://localhost:5000/api/favorites").then( (res) => {
             this.setState(
               {
                 filteredData: res.data
               }
             );
        
    }) 
    
  }
  
// setstat

  handleOpenModal = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    // window.location.pathname = "/foodtrucks";
    return <Redirect to="/favorites" />;
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log("Selected option: ", selectedOption);
  };

// handleFavFoodTruck = () => {

    // ------------------
    // Express JSON option
    // create a get request endpoint to read from a json file in express
    // the get request would be in the Favourites.js file
    // axios.get('/api/favourites')...

    // to post a fav, this endpoint would handle writing to a json file is express
    // see BrainFlix or BrainBooks
    // axios.post('/api/favourites', {data})...

    // ------------------
    // Local Storage Option
    // on click of the button, you will need to get the food truck id or name-slug identifier
    // then from the array the object containing all food trucks, try to filter and only get the one matching the id.
    // take a look at how you did this with the food truck single in the modal

    // once you find the food truck, single object set localstorage to use this data

    // favourites is what the variable in localStorage is set as.
    // localStorage.setItem("favourites", JSON.stringify(foundObject));

    // in Favourites.js you can load the data e.g. 
    // localStorage.getItem("favourites");
  // };

  

  render() {
      if (!this.state.filteredData) {
        return <p className="loading">Loading..</p>;
      }
    const { selectedOption } = this.state;
    console.log(this.state.filteredData)

    // how to write a checkbox
    // function=>receive an index&event
    // index refers to the checkbox


    const savedTruck = () => {
      const identifierArray = this.state.filteredData.map(item => {
        return item.identifier;
      });
      let foodTruck = "";
      let filteredTruck = "";

      if (this.props.info.vendors) {
        const truck = Object.entries(this.props.info.vendors);
        //   truck.length = 10;

        filteredTruck = truck.filter(vendor => 
           (identifierArray.includes(vendor[1].identifier)) ).map(favVendor => favVendor[1])
        console.log(filteredTruck)
        foodTruck = filteredTruck.map(array => {

            let logo = unavailable;
            if (array.images) logo = array.images.logo;

            let description = "";
            if (array.description_short)
              description = array.description_short;
            else description = array.description;

            let hours = "";
            let startHours = "";
            let endHours = "";
            if (array.open.length !== 0) {
              let start = new Date(array.open[0].start * 1000);
              //   console.log(start);
              startHours = start.getHours();
              let end = new Date(array.open[0].end * 1000);
              endHours = end.getHours();
            } else {
              // console.log(array[1].last);
              if (array[1].last) {
                let date = new Date(array.last.time * 1000);
                hours = date.getHours();
              } else {
                hours = "hours unavailable";
              }
            }

            return (
              // OG stucture
              <div className="foodtrucks">
                <div className="foodtrucks__card">
                  <div className="foodtrucks__card-segment">
                    <a
                      href="#"
                      className="foodtrucks__card-segment-name"
                      onClick={this.handleOpenModal}
                    >
                      <Link
                        to={`/favorites/${array.identifier}`}
                        key={array.identifier}
                      >
                        {array.name}
                      </Link>
                      {/* <Switch>
            <Route path={`/foodtrucks/:identifier`} component={Details} />
            </Switch> */}
                    </a>
                    <img
                      className="foodtrucks__card-segment-logo"
                      src={logo}
                      alt="food truck logo"
                    />
                  </div>

                  <div className="foodtrucks__card-segment">
                    <h4 className="foodtrucks__card-segment-address">
                      {array.last && array.last.display}
                    </h4>
                    <h4 className="foodtrucks__card-segment-hours">
                      {startHours
                        ? `Open ${startHours} to ${endHours}`
                        : `Open: ${hours} --`}
                    </h4>
                  </div>
                  <div className="foodtrucks__card-segment">
                    <p className="foodtrucks__card-segment-description">
                      {description}
                    </p>
                  </div>
                </div>
                <ReactModal
                  ariaHideApp={false}
                  isOpen={this.state.showModal}
                  contentLabel="Minimal Modal Example"
                >
                  <Route
                    path={`/favorites/:identifier`}
                    render={routerProps => (
                      <Details
                        vendors={filteredTruck}
                        closeModalNow={this.handleCloseModal}
                        {...routerProps}
                      />
                    )}
                  />
                </ReactModal>
              </div>
            );
          })
      };
    
      return ([filteredTruck, foodTruck])
    };
    const favTrucks = savedTruck();
    console.log(favTrucks);
    // check if info props is loading
    // if (!undefined) {
    // // return (<div>hey</div>)
    // } else {
    // return <p className="loading">Loading..</p>;
    // }
    // const identifierArray = this.state.filteredData.map(item => {
    //     return item.identifier
    // })
    // let foodTruck;
    
    // if (this.props.info.vendors) {
    // const truck = Object.entries(this.props.info.vendors);
    // //   truck.length = 10;
    
    // foodTruck = truck.map(array => {
    //     if(identifierArray.includes(array[1].identifier)) {

    //         let logo = unavailable;
    //         if (array[1].images) logo = array[1].images.logo;
    
    //         let description = "";
    //         if (array[1].description_short)
    //         description = array[1].description_short;
    //         else description = array[1].description;
    
    //         let hours = "";
    //         let startHours = "";
    //         let endHours = "";
    //         if (array[1].open.length !== 0) {
    //         let start = new Date(array[1].open[0].start * 1000);
    //         //   console.log(start);
    //         startHours = start.getHours();
    //         let end = new Date(array[1].open[0].end * 1000);
    //         endHours = end.getHours();
    //         } else {
    //         // console.log(array[1].last);
    //         if (array[1].last) {
    //             let date = new Date(array[1].last.time * 1000);
    //             hours = date.getHours();
    //         } else {
    //             hours = "hours unavailable";
    //         }
    //         }
    
    //         return (
    //         // OG stucture
    //         <div className="foodtrucks">
    //             <div className="foodtrucks__card">
    //             <div className="foodtrucks__card-segment">
    //                 <a
    //                 href="#"
    //                 className="foodtrucks__card-segment-name"
    //                 onClick={this.handleOpenModal}
    //                 >
    //                 <Link
    //                     to={`/favorites/${array[1].identifier}`}
    //                     key={array[1].identifier}
    //                 >
    //                     {array[1].name}
    //                 </Link>
    //                 {/* <Switch>
    //         <Route path={`/foodtrucks/:identifier`} component={Details} />
    //         </Switch> */}
    //                 </a>
    //                 <img
    //                 className="foodtrucks__card-segment-logo"
    //                 src={logo}
    //                 alt="food truck logo"
    //                 />
    //             </div>
    
    //             <div className="foodtrucks__card-segment">
    //                 <h4 className="foodtrucks__card-segment-address">
    //                 {array[1].last && array[1].last.display}
    //                 </h4>
    //                 <h4 className="foodtrucks__card-segment-hours">
    //                 {startHours
    //                     ? `Open ${startHours} to ${endHours}`
    //                     : `Open: ${hours} --`}
    //                 </h4>
    //             </div>
    //             <div className="foodtrucks__card-segment">
    //                 <p className="foodtrucks__card-segment-description">
    //                 {description}
    //                 </p>
    //             </div>
    //             </div>
    //             <ReactModal
    //             ariaHideApp={false}
    //             isOpen={this.state.showModal}
    //             contentLabel="Minimal Modal Example"
    //             >
    //             <Route
    //                 path={`/favorites/:identifier`}
    //                 render={routerProps => (
    //                 <Details
    //                     vendors={this.state.filteredData}
    //                     closeModalNow={this.handleCloseModal}
    //                     {...routerProps}
    //                 />
    //                 )}
    //             />
    //             </ReactModal>
    //         </div>
    //         );
    //     }
    // });
    // }
    // console.log(foodTruck && foodTruck);
    return (
      <>
        <Map info={favTrucks[0]} />
        <Select
          className="select"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
        {favTrucks[1]}
      </>
    );
}
}
