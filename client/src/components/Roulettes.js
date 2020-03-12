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
            <h1 className="title">Roulette</h1>
            <Roulette onChange={handleRouletteChange} items={items} colors={colors} />
          </div>
      </>
    );
}

export default Roulettes
