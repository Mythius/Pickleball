import React from "react";
import PropTypes from "prop-types";
import menuBar from "./3lines.svg";
import profile from "./profile.png";
import "./NavigationBar.css";
import loadProfile from '../googleSignIn/autoLogin';

const NavigationBar = () => {


  const toggleMenu = () => {
    document.querySelector('nav')?.classList.remove('closed');
  };

  loadProfile();

  return (
    <div className="topbar">
      <div className="logo">
        <img className="icon" src={menuBar} alt="" onClick={toggleMenu} />
      </div>
      <h1 className="title">Pickleball App</h1>
      <div className="userProfile">
        <img className="icon" src={profile} alt="" />
      </div>
    </div>
  );
};

NavigationBar.propTypes = {};

export default NavigationBar;
