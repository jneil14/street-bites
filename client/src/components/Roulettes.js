import React, { Component } from 'react'
import Roulette from 'react-roulette';
import Details from './Details';
import ReactModal from "react-modal";
import { Route, Link, Redirect } from "react-router-dom";


export default class Roulettes extends Component {
  
    state ={
      showModal: false,
      showRoulette: true
    }

   handleOpenModal = () => {
    this.setState({ showModal: true, showRoulette: false });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, showRoulette: true });
    // window.location.pathname = "/foodtrucks";
    return <Redirect to="/new" />;
  };


  render() {
    let items = this.props.vendors.map(vendor => vendor.identifier);
    // console.log(this.props.vendors)
    let vendors = this.props.vendors;

    const colors = ["#EAECEF", "#FBD1A2", "#BED558", "#F76156", "#FBF2DA"];
    
    return (
      <>
        <div className="roulette">
          <div className="roulette__body">
            <h1 className="roulette__body-title">Food Truck Roulette</h1>
            {this.state.showRoulette ? (
              <Roulette items={items} colors={colors} />
            ) : (
              ""
            )}
          </div>
          <div className="roulette__selected">
            <div className="roulette__selected-list">
              {Object.keys(vendors).map((vendor, index) => (
                <a
                  href="#"
                  className={`roulette__selected-list-${index}`}
                  onClick={this.handleOpenModal}
                >
                  <Link
                    to={`/new/${vendors[vendor].identifier}`}
                    key={vendors[vendor].identifier}
                  >
                    {vendors[vendor].name}
                  </Link>
                </a>
              ))}
            </div>
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
                vendors={this.props.filteredData}
                closeModalNow={this.handleCloseModal}
                {...routerProps}
              />
            )}
          />
        </ReactModal>
      </>
    );
  }
}


