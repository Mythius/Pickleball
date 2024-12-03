import React from "react";
import PropTypes from "prop-types";
import "./ScheduledGame.css";
import { createPromptBox } from "../../control";

const ScheduledGame = (props) => {
  return (
    <div className="ScheduledGame">
      <div  onClick={props.clickCallback} className="game">
        <div>
          <div className={"game-content "+(props.winner===''?'':(props.winner==props.team1?'winner':'loser'))}>{props.team1}</div>
          <div className={"game-content "+(props.winner===''?'':(props.winner==props.team2?'winner':'loser'))}>{props.team2}</div>
        </div>
        <div className="game-content">
          Round {props.round}
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
