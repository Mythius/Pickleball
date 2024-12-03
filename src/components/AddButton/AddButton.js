import React from "react";
import PropTypes from "prop-types";
import "./AddButton.css";
import share from './share.png';

const AddButton = ({ onClick, symbol = "+", transform }) => {
  if(symbol.toLocaleLowerCase() == 'share'){
    symbol = <img src={share} width="35"/>
  }
  return (
    <div style={{transform}} onClick={onClick} className="AddButton">
      {symbol}
    </div>
  );
};

AddButton.propTypes = {};

AddButton.defaultProps = {};

export default AddButton;
