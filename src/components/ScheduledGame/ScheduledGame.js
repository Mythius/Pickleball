import React from "react";
import PropTypes from "prop-types";
import "./ScheduledGame.css";

const ScheduledGame = (props) => {
  let vars;
  return (
    <div className="ScheduledGame">
      <div className="game">
        <div>
          <div className="game-content">{props.team1}</div>
          <div className="game-content">{props.team2}</div>
        </div>
        <div className="game-content">
          Round {props.round} - {props.time}
          <br />
          {props.court}
        </div>
      </div>
    </div>
  );
};

ScheduledGame.propTypes = {};

ScheduledGame.defaultProps = {
  team1: 'Team1',
  team2: 'Team2',
  round: 5,
  court: 'Court 1',
  time: '3:00'
};

export default ScheduledGame;
