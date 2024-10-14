import React from 'react';
import PropTypes from 'prop-types';
import './GameResult.css';

const GameResult = (props) => (
  <div className={"result "+props.result.toLowerCase()}>
    <div>Match {props.matchNum}</div>
    <div>{props.score}</div>
    <div>{props.result}</div>
  </div>
);

GameResult.propTypes = {};

GameResult.defaultProps = {
  matchNum: 1,
  score: '10 - 12',
  result: 'Won'
};

export default GameResult;
