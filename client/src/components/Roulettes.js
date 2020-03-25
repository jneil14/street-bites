import React from 'react'
import Roulette from 'react-roulette';




function Roulettes (props) {
    let items = props.vendors.map(vendor => vendor.identifier)
    // const items = [ "Food truck 1", "Food truck 2", "Food truck 3", "Food truck 4", "Food truck 5" ];
    const colors = ["#EAECEF", "#FBD1A2", "#BED558", "#F76156", "#FBF2DA"]; 

  const handleRouletteChange =(foodtruck) => {
    console.log(foodtruck);
  }
    return (
      <>
        <div className="roulette">
          <div className="roulette__body">
            <h1 className="roulette__body-title">Food Truck Roulette</h1>
            <Roulette
              onChange={handleRouletteChange}
              items={items}
              colors={colors}
            />
          </div>
          <div className="roulette__selected">
            <ol className="roulette__selected-list">
              {items.map((vendor, index) => (
                  <li className={`roulette__selected-list-${index}`}> {vendor}</li>
              ))}
            </ol>
          </div>
        </div>
      </>
    );
}

export default Roulettes
