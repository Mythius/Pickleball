import React from 'react';
import PropTypes from 'prop-types';
import './AddButton.css';

const AddButton = ({onClick,symbol='+'}) => (
  <div onClick={onClick} className="AddButton">
    {symbol}
  </div>
);

AddButton.propTypes = {};

AddButton.defaultProps = {};

export default AddButton;
