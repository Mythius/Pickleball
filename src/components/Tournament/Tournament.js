import React from "react";
import PropTypes from "prop-types";
import "./Tournament.css";
import pencil from "./pencil.png";
import trash from "./trash.png";
import join from './join.png';

const Tournament = ({ name, id }) => {
  async function deleteTournament(){
    let req = window.request('/tournament/'+id,{method:'DELETE'});
    console.log(req);
  }
  return (
    <div className="Tournament">
      {name}
      <right>
        <img src={join} />
        <img src={pencil} />
        <img onClick={deleteTournament} src={trash} />
      </right>
    </div>
  );
};

Tournament.propTypes = {};

Tournament.defaultProps = {};

export default Tournament;
