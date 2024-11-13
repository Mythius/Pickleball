import React from 'react';
import PropTypes from 'prop-types';
import './AddButton.css';

const AddButton = ({onClick}) => (
  <div onClick={onClick} className="AddButton">
    +
  </div>
);

AddButton.propTypes = {};

AddButton.defaultProps = {};

export default AddButton;
