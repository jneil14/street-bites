import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Select from "react-select";
import unavailable from "../assets/logo/unavailable.jpg";
import ReactModal from "react-modal";
import Details from "./Details";
import Map from "./Map";
import Roulettes from "./Roulettes";


const options = [
  {
    value: "featured",
    label: (
      <Link to={"/"} className="options__featured">
        Featured
      </Link>
    )
  },
  {
    value: "new",
    label: (
      <Link to={"/new"} className="options__new">
        New
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
  {
    value: "favorites",
    label: (
      <Link to={"/favorites"} className="options__favorites">
        Favorites
      </Link>
    )
  }
];
export default class NewTrucks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      showModal: false,
      filteredData: this.props.info,
      selectedTrucks: [],
      selectedTrucksArray: [],
      selectElements: true,
      showTrucks: true
    };
  }

  componentWillReceiveProps(prevProps, prevState) {
    this.setState({
      filteredData: prevProps.info
    });
  }

  componentDidMount() {
    this.setState({
      filteredData: this.props.info
    });
  }

  handleOpenModal = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    // window.location.pathname = "/foodtrucks";
    return <Redirect to="/new" />;
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  handleSelect = (event, index, vendor) => {
    let tempArray = this.state.selectedTrucks;
    tempArray[index] = !tempArray[index];
    let selectedTrucksArray = this.state.selectedTrucksArray;
    if (tempArray[index]) {
      if (selectedTrucksArray.length < 6) {
        selectedTrucksArray.push(vendor);
        this.setState({
          selectedTrucks: tempArray,
          selectedTrucksArray
        });
      }

      if (selectedTrucksArray.length === 5) {
        this.setState({
          selectElements: false,
          showTrucks: true
        });
      }
    } else {
      let removedTrucksArray = selectedTrucksArray.filter(
        selectedVendor => selectedVendor.identifier !== vendor.identifier
      );
      this.setState(
        {
          selectedTrucks: tempArray,
          selectedTrucksArray: removedTrucksArray
        },
        () => {
          if (this.state.selectedTrucksArray.length < 5)
            this.setState({
              selectElements: true
            });
        }
      );
    }
  };


handleBackBtn = () => {
  this.setState({
    showTrucks: false
  })
}


  render() {
    const { selectedOption } = this.state;
    let newVendors;
    const newTrucks = this.state.filteredData.metadata.new;

    const newList = this.state.filteredData.metadata.new;

    const vendorsEntries = Object.entries(this.state.filteredData.vendors);

    const newNames = newList.map(truck => {
      return vendorsEntries.filter(arr => {
        return arr[1].identifier === truck;
      });
    });

    let foodTruck;

    // check if info props is loading
    if (undefined) {
      return <p className="loading">Loading...</p>;
    } else {
      newVendors = newNames.map(array => {
        return array[0][1];
      });

      foodTruck = newNames.map((array, index) => {
        let logo = unavailable;
        if (array[0][1].images) logo = array[0][1].images.logo;

        let description = "";
        if (array[0][1].description_short)
          description = array[0][1].description_short;
        else description = array[0][1].description;

        let hours = "";
        let startHours = "";
        let endHours = "";
        if (array[0][1].open.length !== 0) {
          let start = new Date(array[0][1].open[0].start * 1000);
          startHours = start.getHours();
          let end = new Date(array[0][1].open[0].end * 1000);
          endHours = end.getHours();
        } else {
          let date = new Date(array[0][1].last.time * 1000);
          hours = date.getHours();
        }

        return (
          <div className="foodtrucks">
            <div className="foodtrucks__card">
              {(this.state.selectElements ||
                this.state.selectedTrucks[index]) &&
              (this.state.selectedTrucks.length === 0 ||
                this.state.selectedTrucks.length !== 0 ||
                this.state.selectedTrucks[index]) ? (
                <label>
                  <input
                    type="checkbox"
                    checked={
                      this.state.selectedTrucks.length !== 0
                        ? this.state.selectedTrucks[index]
                        : false
                    }
                    onChange={event =>
                      this.handleSelect(event, index, array[0][1])
                    }
                    className="checkbox"
                  />
                  Select
                </label>
              ) : (
                ""
              )}
              <div className="foodtrucks__card-segment">
                <a
                  href="#"
                  className="foodtrucks__card-segment-name"
                  onClick={this.handleOpenModal}
                >
                  <Link
                    to={`/new/${array[0][1].identifier}`}
                    key={array[0][1].identifier}
                  >
                    {array[0][1].name}
                  </Link>
                </a>
                <img
                  className="foodtrucks__card-segment-logo"
                  src={logo ? logo : unavailable}
                  alt="food truck logo"
                />
              </div>

              <div className="foodtrucks__card-segment">
                <h4 className="foodtrucks__card-segment-address">
                  {array[0][1].last ? array[0][1].last.display : "(Address not available. Please refer to the map for location)"}
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
                path={`/new/:identifier`}
                render={routerProps => (
                  <Details
                    vendors={this.state.filteredData}
                    closeModalNow={this.handleCloseModal}
                    {...routerProps}
                  />
                )}
              />
            </ReactModal>
          </div>
        );
      });
    }

    return (
      <>
        {this.state.showTrucks && !this.state.selectElements ? (
          <>
            <button className="roulette__back-btn" onClick={this.handleBackBtn}>
              BACK
            </button>
            <Roulettes
              vendors={this.state.selectedTrucksArray}
              filteredData={this.state.filteredData}
            />{" "}
          </>
        ) : (
          <>
            <Map info={newVendors} />
            <Select
              className="select"
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
            <div className="roulette__instructions">
              <p className="roulette__instructions-title">Instructions</p>
              <p className="roulette__instructions-text">
                - Pick 5 food trucks for Food Truck Roulette to display.
              </p>
              <p className="roulette__instructions-text">
                - If you want to change food trucks after selecting 5, you can
                use back button to refer back to the list and select another one.
              </p>
              <p className="roulette__instructions-text">
                - When satisfied, you can now spin the wheel.
              </p>
              <p className="roulette__instructions-text">
                - Whatever color the pointer points to last will be the result.
              </p>
              <p className="roulette__instructions-text">
                - Click on the name of the food truck for more details.
              </p>
            </div>
            {foodTruck}
          </>
        )}
      </>
    );
  }
}
