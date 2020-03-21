import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Select from "react-select";
import unavailable from "../assets/logo/unavailable.jpg";
import ReactModal from "react-modal";
import Details from "./Details";

const options = [
  { value: "featured", label: "Featured" },
  { value: "new", label: "New" },
  { value: "all", label: "All" }
];
export default class NewTrucks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      showModal: false,
      filteredData: this.props.info
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
    return <Redirect to="/foodtrucks" />;
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log("Selected option: ", selectedOption);
  };

  render() {
    const { selectedOption } = this.state;

    const newTrucks = this.state.filteredData.metadata.new;
    console.log("New Food Trucks", newTrucks);


    const trucksNew = this.state.filteredData.metadata.new;
    console.log("filtered", newTrucks);
    const vendors_entries = Object.entries(this.state.filteredData.vendors);
    console.log(vendors_entries);

    trucksNew.map(truck => {

    });



    // check if info props is loading
    if (!undefined) {
      // return (<div>hey</div>)
    } else {
      return <p className="loading">Loading..</p>;
    }

    let foodTruck;
    if (newTrucks === this.props.info.vendors.name) {
      const truck = Object.entries(this.props.info.vendors);
      
      foodTruck = truck.map(array => {
        let logo = unavailable;
        if (array[1].images) logo = array[1].images.logo;

        let description = "";
        if (array[1].description_short)
          description = array[1].description_short;
        else description = array[1].description;

        let hours = "";
        let startHours = "";
        let endHours = "";
        if (array[1].open.length !== 0) {
          console.log(typeof array[1].open[0].start);

          // array[1].open.map(time => {
          //   let start = new Date(time.start);
          //   startHours = start.getHours();
          //   let end = new Date(time.end);
          //   endHours = end.getHours();
          // })
          let start = new Date(array[1].open[0].start * 1000);
          console.log(start);
          startHours = start.getHours();
          let end = new Date(array[1].open[0].end * 1000);
          endHours = end.getHours();
        } else {
          let date = new Date(array[1].last.time * 1000);
          hours = date.getHours();
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
                    to={`/foodtrucks/${array[1].identifier}`}
                    key={array[1].identifier}
                  >
                    {array[1].name}
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
                  {array[1].last.display}
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
                path={`/foodtrucks/:identifier`}
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
        <Select
          className="select"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
        {foodTruck}
      </>
    );
  }
}
