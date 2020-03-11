import React, { Component } from 'react'
import map from '../assets/images/map.jpg';

export default class Map extends Component {
    render() {
        return (
            <>
                <div className="map">
                    <img className="map__image" src={map} alt="map" />
                </div>
            </>
        )
    }
}
