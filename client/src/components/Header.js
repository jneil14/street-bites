import React from 'react';
import logo from '../assets/logo/SBlogo.png';
import person from "../assets/icons/person.png";
import foodtruck from "../assets/icons/food truck.png";
import distance from '../assets/icons/line.png';

function Header() {
    return (
        <>
            <div className="header">
                <div className="header__logo">
                    <img className="header__logo-actual" src={logo} alt='logo' />
                </div>

                <div className="header__line">
                    <img className="header__line-person" src={person} alt="person icon" />
                    <img className="header__line-distance" src={distance} alt="line" />
                    <img className="header__line-foodtruck" src={foodtruck} alt="food truck" />
                </div>
            </div>
        </>
    )
}

export default Header
