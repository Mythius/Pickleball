import React from "react";
import PropTypes from "prop-types";
import "./menu.css";
import closeButton from './close.png';

const menu = () => {
  function closeMenu(){
    document.querySelector('nav').classList.add('closed');
  }
  return (
    <nav className="closed">
      <img src={closeButton} alt="" onClick={closeMenu}/>
      <a href="/my-tourneys">My Tournaments</a>
      <a href="/tournament">Upcoming Games</a>
      <a href="/history">Game History</a>
      <a href="/logout">Logout</a>
    </nav>
  );
};

menu.propTypes = {};

export default menu;
