import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Select from "react-select";
import unavailable from "../assets/logo/unavailable.jpg";
import ReactModal from "react-modal";
import Details from "./Details";
import Map from './Map';
import Favorites from "./Favorites";
import Roulettes from "./Roulettes";
import favoriteIcon from "../assets/icons/favorite.png";

const options = [
  { value: "featured", label: <Link to={"/"} className="options__featured"> Featured </Link> },
  { value: "new", label: <Link to={"/new"} className="options__new"> New </Link> },
  { value: "all", label: <Link to={"/alltrucks"} className="options__all"> All </Link> },
  {value: "favorites", label: (<Link to={"/favorites"} className="options__favorites">Favorites</Link>)}
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
      selectElements: true
      // info: []
      // details: [],
    };
  }

  // getDerivedStateFromProps = (nextProps, prevState) => {
  //   console.log("nextProps", nextProps);
  // }
  componentWillReceiveProps(prevProps, prevState) {
    console.log("prevProps", prevProps);
    this.setState({
      filteredData: prevProps.info
    });
  }

  componentDidMount() {
    this.setState({
      filteredData: this.props.info,
      
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
    console.log("Selected option: ", selectedOption);
  };

  handleSelect = (event, index, vendor) => {
      let tempArray = this.state.selectedTrucks
      tempArray[index] = !tempArray[index];
      let selectedTrucksArray = this.state.selectedTrucksArray;
      if(tempArray[index]) {     
      if(selectedTrucksArray.length < 6) {
          selectedTrucksArray.push(vendor)
          this.setState({
            selectedTrucks: tempArray, 
            selectedTrucksArray
          }, () => console.log("adding trucks", [this.state.selectedTrucks, this.state.selectedTrucksArray]));
          
      }
    
     if (selectedTrucksArray.length === 5) {
        // let selectElements = this.state.selectElements

       this.setState({
         selectElements: false
       });
     }
    }
    
    else {
        console.log("vendor", vendor)
        let removedTrucksArray = selectedTrucksArray.filter(
          selectedVendor =>
            selectedVendor.identifier !== vendor.identifier
        );
        console.log(removedTrucksArray)
        this.setState({
          selectedTrucks: tempArray,
          selectedTrucksArray: removedTrucksArray
        },  () => {if(this.state.selectedTrucksArray.length < 5) this.setState({
            selectElements: true
        })});
    }

}

  render() {
    const { selectedOption } = this.state;
    let newVendors;
    const newTrucks = this.state.filteredData.metadata.new;


     const newList = this.state.filteredData.metadata.new;
    
     const vendorsEntries = Object.entries(this.state.filteredData.vendors);
    
     console.log(vendorsEntries[0][1]);
     const newNames = newList.map(truck => {
       return vendorsEntries.filter(arr => {
         return arr[1].identifier === truck;
       });
     });
     console.log(newNames);

     let foodTruck;

    // check if info props is loading
    if (undefined) {
      // return (<div>hey</div>)
      return <p className="loading">Loading...</p>;

    } else {

    
console.log(newNames[0][0][1]);
newVendors = newNames.map(array => {
    return array[0][1]
})

      
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
          console.log(typeof array[0][1].open[0].start);

          let start = new Date(array[0][1].open[0].start * 1000);
          console.log(start);
          startHours = start.getHours();
          let end = new Date(array[0][1].open[0].end * 1000);
          endHours = end.getHours();
        } else {
          let date = new Date(array[0][1].last.time * 1000);
          hours = date.getHours();
        }
        
      

        return (
          // OG stucture
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
                  {array[0][1].last && array[0][1].last.display}
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
        <Map info={newVendors} />
        <Select
          className="select"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
        {foodTruck}
        {!this.state.selectElements ? <Roulettes vendors={this.state.selectedTrucksArray} /> : ""}
      </>
    );
  }
}
