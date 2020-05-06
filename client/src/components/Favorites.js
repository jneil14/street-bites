import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Select from "react-select";
import unavailable from "../assets/logo/unavailable.jpg";
import ReactModal from "react-modal";
import Details from "./FavoriteDetails";
import Map from "./Map";
import axios from "axios";


const options = [
  { value: "featured", label: (<Link to={"/"} className="options__featured"> Featured </Link> )},
  { value: "new", label: (<Link to={"/new"} className="options__new"> New </Link> )},
  { value: "all", label: (<Link to={"/alltrucks"} className="options__all"> All </Link> )},
  { value: "favorites", label: (<Link to={"/favorites"} className="options__favorites">Favorites</Link>)}
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

  componentDidMount() {
    axios.get("http://localhost:5000/api/favorites").then( (res) => {
      this.setState({filteredData: res.data});    
    }) 
  }

  removeFavorite = (event, identifier) => {
    axios
      .delete(`http://localhost:5000/api/favorites/${identifier}`)
      .then(respond => {
        if (respond.data) {
          this.setState({
            filteredData: respond.data.favorites
          })
          console.log("truck has been removed", respond.data);
        }
      });
  }

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
  };
  

  render() {
      if (!this.state.filteredData) {
        return <p className="loading">Loading..</p>;
      }
    const { selectedOption } = this.state;

    const savedTruck = () => {
      const identifierArray = this.state.filteredData.map(item => {
        return item.identifier;
      });
      let foodTruck = "";
      let filteredTruck = "";

      if (this.props.info.vendors) {
        const truck = Object.entries(this.props.info.vendors);
    
        filteredTruck = truck.filter(vendor => 
           (identifierArray.includes(vendor[1].identifier)) ).map(favVendor => favVendor[1])
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
              startHours = start.getHours();
              let end = new Date(array.open[0].end * 1000);
              endHours = end.getHours();
            } else {
              if (array[1] && array[1].last) {
                let date = new Date(array.last.time * 1000);
                hours = date.getHours();
              } else {
                hours = "hours unavailable";
              }
            }

            return (
              <div className="foodtrucks">
                <div className="foodtrucks__card">
                  <button className="foodtrucks__favorite-remove" onClick={event => this.removeFavorite(event, array.identifier)}>
                    x Remove
                  </button>
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
                        ? `Hours: ${startHours} to ${endHours}`
                        : `Hours: ${hours} --`}
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
