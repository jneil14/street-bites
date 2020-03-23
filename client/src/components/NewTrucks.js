import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Select from "react-select";
import unavailable from "../assets/logo/unavailable.jpg";
import ReactModal from "react-modal";
import Details from "./Details";
import Map from './Map';

const options = [
  { value: "featured", label: <Link to={"/"} className="options__featured"> Featured </Link> },
  { value: "new", label: <Link to={"/new"} className="options__new"> New </Link> },
  { value: "all", label: <Link to={"/alltrucks"} className="options__all"> All </Link> }
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
    return <Redirect to="/new" />;
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log("Selected option: ", selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    let newVendors;
    const newTrucks = this.state.filteredData.metadata.new;
    // console.log("New Food Trucks", newTrucks);


    // const trucksNew = this.state.filteredData.metadata.new;
    // console.log("filtered", newTrucks);
    // const vendors_entries = Object.entries(this.state.filteredData.vendors);
    // console.log(vendors_entries);

    // newTrucks.map(truck => {

    // });



     const newList = this.state.filteredData.metadata.new;
    //  console.log("filtered", newList);
     const vendorsEntries = Object.entries(this.state.filteredData.vendors);
    //  console.log("vendors", vendorsEntries);
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
    return array[0]["1"]
})

    // if (newTrucks === this.props.info.vendors.name) {
    //   const truck = Object.entries(this.props.info.vendors);
      
      foodTruck = newNames.map((array, index) => {
        //   console.log(array[0]["1"]);
        let logo = unavailable;
        if (array[0]["1"].images) logo = array[0]["1"].images.logo;

        let description = "";
        if (array[0]["1"].description_short)
          description = array[0]["1"].description_short;
        else description = array[0]["1"].description;

        let hours = "";
        let startHours = "";
        let endHours = "";
        if (array[0]["1"].open.length !== 0) {
          console.log(typeof array[0]["1"].open[0].start);

          // array[1].open.map(time => {
          //   let start = new Date(time.start);
          //   startHours = start.getHours();
          //   let end = new Date(time.end);
          //   endHours = end.getHours();
          // })
          let start = new Date(array[0]["1"].open[0].start * 1000);
          console.log(start);
          startHours = start.getHours();
          let end = new Date(array[0]["1"].open[0].end * 1000);
          endHours = end.getHours();
        } else {
          let date = new Date(array[0]["1"].last.time * 1000);
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
                    to={`/new/${array[0][1].identifier}`}
                    key={array[0][1].identifier}
                  >
                    {array[0][1].name}
                  </Link>
                  {/* <Switch>
                    <Route path={`/foodtrucks/:identifier`} component={Details} />
                  </Switch> */}
                </a>
                <img
                  className="foodtrucks__card-segment-logo"
                  src={logo ? logo : unavailable}
                  alt="food truck logo"
                />
              </div>

              <div className="foodtrucks__card-segment">
                <h4 className="foodtrucks__card-segment-address">
                  {array[0][1].last.display}
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
      </>
    );
  }
}
