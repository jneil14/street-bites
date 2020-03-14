import React, { Component } from "react";
import Select from "react-select";
import sampleTruck from "../assets/images/sample-food-truck.jpeg";
import ReactModal from "react-modal";
import Details from "./Details";

const options = [
  { value: "featured", label: "Featured" },
  { value: "near-by", label: "Near-by" },
  { value: "new", label: "New" }
];
export default class Foodtrucks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      showModal: false
      // info: []
      // details: [],
    };
  }

  handleOpenModal = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log("Selected option: ", selectedOption);
  };

  render() {
    const { selectedOption } = this.state;

    // check if info props is loading
    // if (!undefined) {
    //   // return (<div>hey</div>)
    // } else {
    //   return <p className="loading">Loading..</p>;
    // }

    let foodTruck;
    if (this.props.info.vendors) {
      const obj = Object.entries(this.props.info.vendors);
      obj.length = 3;
      foodTruck = obj.map(array => {
        console.log(array);

        return (
          <div className="foodtrucks__card">
            <div className="foodtrucks__card-segment">
              <a
                href="#"
                className="foodtrucks__card-segment-name"
                onClick={this.handleOpenModal}
              >
                <h2>{array[0]}</h2>
                <p>{array[1].description_short}</p>
              </a>
            </div>
          </div>
        );
        // for (let i = 0; i < 11; i++) {
        //   return array[i][1].name;
        // }
        // console.log("name", name);
      });
    }
    // let result = []

    // let namer = obj.forEach(item => {
    //   result = [...result, ...Object.values(item.data.vendors.name)];
    // });

    // {
    //   this.props.info.map(truck => {
    //     console.log("truck", truck);
    //   });
    // }

    // let trucks;
    // for (let truck in this.props.info.vendors) {
    //   console.log(truck);
    // }

    // if (this.props.info.vendors !== undefined) {
    //   const keys = Object.keys(this.props.info.vendors);
    //   console.log(keys);
    //   for (const key of keys) {
    //     console.log(key);
    //   }
    // }

    return (
      <>
        {foodTruck}
        <Select
          className="select"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />

        <div className="foodtrucks">
          <div className="foodtrucks__card">
            <div className="foodtrucks__card-segment">
              <button
                className="foodtrucks__card-segment-name"
                onClick={this.handleOpenModal}
              >
                {/* {console.log("name here", { name })} */}
              </button>
              <img
                className="foodtrucks__card-segment-logo"
                src={sampleTruck}
                alt="food truck logo"
              />
            </div>
            <div className="foodtrucks__card-segment">
              <h4 className="foodtrucks__card-segment-address">
                455 Granville
              </h4>
              <h4 className="foodtrucks__card-segment-hours">
                9 a.m. - 10 p.m.
              </h4>
            </div>
            <div className="foodtrucks__card-segment">
              <p className="foodtrucks__card-segment-description">
                Yummiest food truck in the Whole Wide World
              </p>
            </div>
          </div>
          <ReactModal
            ariaHideApp={false}
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
          >
            <Details
              closeModalNow={this.handleCloseModal}
              // details={this.props.details}
              // updateTheState={this.props.updateTheState}
            />
          </ReactModal>
        </div>
      </>
    );
  }
}
