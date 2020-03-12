import React, { Component } from 'react';
import Select from "react-select";
import sampleTruck from '../assets/images/sample-food-truck.jpeg'
import ReactModal from "react-modal";
import Details from './Details';




const options = [
  { value: "featured", label: "Featured" },
  { value: "near-by", label: "Near-by" },
  { value: "new", label: "New" }
];
export default class Foodtrucks extends Component {
    state = {
        selectedOption: null,
        showModal: false,
        details: []

    }

    handleOpenModal = () => {
      this.setState({showModal: true})
    }

    handleCloseModal = () => {
      this.setState({showModal: false})
    }

    handleChange = selectedOption => {
        this.setState({selectedOption});
        console.log('Selected option: ', selectedOption);
    };


    render() {
        const  {selectedOption} = this.state;
        return (
          <>
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
                    Dahbest Foodtruck
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
                  details={this.props.details}
                  // updateTheState={this.props.updateTheState}
                />
              </ReactModal>
            </div>
          </>
        );
    }
}
