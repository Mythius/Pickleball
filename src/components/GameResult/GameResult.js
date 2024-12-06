import React from 'react';
import PropTypes from 'prop-types';
import './GameResult.css';

const GameResult = (props) => (
  <div className={"result "+props.result.toLowerCase()}>
    <div>{props.matchName}</div>
    <div>{props.score}</div>
    <div>{props.result}</div>
  </div>
);

GameResult.propTypes = {};

GameResult.defaultProps = {
  matchName: 'Match 1',
  score: '10 - 12',
  result: 'Won'
};

export default GameResult;
