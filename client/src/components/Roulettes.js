import React from 'react'
import Roulette from 'react-roulette';

function Roulettes () {
    const items = [ "Food truck 1", "Food truck 2", "Food truck 3", "Food truck 4", "Food truck 5" ];
    const colors = ["#F76156", "#FBD1A2", "#BED558", "#F76156", "#FBD1A2"]; 

  const handleRouletteChange =(foodtruck) => {
    console.log(foodtruck);
  }
    return (
      <>
        <div className="roulette">
          <div className="roulette__output">
            <a href="#">
              <h2 className="roulette__output-result">RESULT</h2>
            </a>
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
              <a href="#">
                
                <li> </li>
              </a>
              <a href="#">
                
                <li> </li>
              </a>
              <a href="#">
                
                <li> </li>
              </a>
              <a href="#">
                
                <li> </li>
              </a>
              <a href="#">
                
                <li> </li>
              </a>
            </ol>
          </div>
        </div>
      </>
    );
}

export default Roulettes
