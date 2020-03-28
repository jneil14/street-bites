import React, { Component } from 'react'
import Roulette from 'react-roulette';
import Details from './Details';
import ReactModal from "react-modal";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import background from "../assets/images/roulette-background.jpg";


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

    const colors = ["#EAECEF", "#FBD1A2", "#BED558", "#F76156", "#FBF2DA"];
    
    return (
      <>
        <div className="roulette">
          <div className="roulette__body">
            <h1 className="roulette__body-title">Food Truck Roulette</h1>
            {this.state.showRoulette ? (
              <Roulette
                items={items}
                colors={colors}
              />
            ) : (
              ""
            )}
          </div>
          <div className="roulette__selected">
            <div className="roulette__selected-list">
              {items.map((vendor, index) => (
                <a
                  href="#"
                  className={`roulette__selected-list-${index}`}
                  onClick={this.handleOpenModal}
                >
                  <Link to={`/new/${vendor}`} key={vendor}>
                    {vendor}
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


