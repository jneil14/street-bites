import React from 'react'
import Roulette from 'react-roulette';



function Roulettes (props) {
    let items = props.vendors.map(vendor => vendor.identifier)
    // const items = [ "Food truck 1", "Food truck 2", "Food truck 3", "Food truck 4", "Food truck 5" ];
    const colors = ["#808000", "#FBD1A2", "#BED558", "#F76156", "#008080"]; 

  const handleRouletteChange =(foodtruck) => {
    console.log(foodtruck);
  }
    return (
      <>
        <div className="roulette">
          <div className="roulette__output">
            {/* <a href="#">
              <h2 className="roulette__output-result">RESULT</h2>
            </a> */}
          </div>
          <div className="roulette__body">
            <h1 className="title">Roulette</h1>
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
              {/* <a href="#">
                <li className="roulette__selected-list-one"> </li>
              </a>
              <a href="#">
                <li className="roulette__selected-list-two"> </li>
              </a>
              <a href="#">
                <li className="roulette__selected-list-three"> </li>
              </a>
              <a href="#">
                <li className="roulette__selected-list-four"> </li>
              </a>
              <a href="#">
                <li className="roulette__selected-list-five"> </li>
              </a> */}
            </ol>
          </div>
        </div>
      </>
    );
}

export default Roulettes
