import React from "react";
import PropTypes from "prop-types";
import menuBar from "./3lines.svg";
import profile from "./profile.png";
import "./NavigationBar.css";

const NavigationBar = () => {

  async function loadProfile() {
    if (window.auth_token) {
      let profile = await window.request("/profile");
      if(profile.src == undefined) return;
      document.querySelector(".userProfile img").src = profile.src;
      if (window.location.pathname == "/" || window.location.pathname == "index.html") {
        window.location.href = "/tournament";
      }
    }
  }

  loadProfile();

  const toggleMenu = () => {
    document.querySelector('nav')?.classList.remove('closed');
  };

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
