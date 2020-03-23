import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Select from "react-select";
import unavailable from "../assets/logo/unavailable.jpg";
import ReactModal from "react-modal";
import Details from "./Details";
import Map from "./Map";

const options = [ 
  { value: "featured", label: <Link to={"/"} className="options__featured"> Featured </Link> },
  { value: "new", label: <Link to={"/new"} className="options__new"> New </Link> },
  { value: "all", label: <Link to={"/alltrucks"} className="options__all"> All </Link> }
];
export default class Foodtrucks extends Component {
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
    let sortedTruckRank; 
    let topVendors;
//   const newTrucks = this.state.filteredData.metadata.new;
//   console.log("filtered", newTrucks);
//   const vendors_entries = Object.entries(this.state.filteredData.vendors);
//   console.log("vendors", vendors_entries);
// console.log(vendors_entries[0][1]);
//  const newNames =  newTrucks.map(truck => {
//     return vendors_entries.filter(arr => {
//       return arr[1].identifier === truck;
//     })
//   });
// console.log(newNames);

    // check if info props is loading
    if (!undefined) {
      // return (<div>hey</div>)
    } else {
      return <p className="loading">Loading..</p>;
    }

    let foodTruck;
    if (this.props.info.vendors) {
      let truck = Object.entries(this.props.info.vendors);
      // truck.length = 10;
      truck = truck.filter(array => array[1].rank < 11)
     
    let truckRankObj = []
     let truckRank = truck.map((array, index) => {
       truckRankObj.push([array[1].rank, array[1]]);
        return [array[1].rank]
      })
      console.log(
        truckRank.sort(function(a, b) {
          return a - b;
        })
      );
      sortedTruckRank = truckRank.map(rank => {
        let truckRankArray = []
        truckRankObj.forEach(truck => {
          
          if (truck[0] === rank[0]) {
            truckRankArray.push(truck)
          }
        }) 
        return truckRankArray;
      })
      topVendors = sortedTruckRank.map(array => {
        return array[0][1]
      })
      console.log(topVendors);
console.log(truckRankObj);
console.log(sortedTruckRank);
      foodTruck = sortedTruckRank.map((array, index)=> {
        console.log(array[0][1])
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

          // array[1].open.map(time => {
          //   let start = new Date(time.start);
          //   startHours = start.getHours();
          //   let end = new Date(time.end);
          //   endHours = end.getHours();
          // })
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
              <div className="foodtrucks__card-favorite">Favorite:</div>
              <div className="foodtrucks__card-segment">
                <a
                  href="#"
                  className="foodtrucks__card-segment-name"
                  onClick={this.handleOpenModal}
                >
                  <Link
                    to={`/foodtrucks/${array[0][1].identifier}`}
                    key={array[0][1].identifier}
                    className="foodtrucks__card-segment-name"
                  >
                    {array[0][1].name}
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
                  {array[0][1].last.display}
                </h4>
                <p className="foodtrucks__card-segment-hours">
                  {startHours
                    ? `Hours: ${startHours} to ${endHours}`
                    : `Hours: ${hours} --`}
                </p>
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
                exact
                path={`/foodtrucks/:identifier`}
                // path={this.state.path}
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
        <Map info={topVendors} />
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


