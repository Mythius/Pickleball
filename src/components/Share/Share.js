import React from 'react';
import PropTypes from 'prop-types';
import './Share.css';

const Share = ({url}) => (
  <div className="Share">
    <iframe src={`https://msouthwick.com/qr/qr.html?${url}`} width='266' height='266'></iframe>
    <br/>
    <br/>
    <a href={`javascript:navigator.clipboard.writeText("${url}")`}>Copy Link</a>
  </div>
);

Share.propTypes = {};

Share.defaultProps = {};

export default Share;
