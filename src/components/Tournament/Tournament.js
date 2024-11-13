import React from "react";
import PropTypes from "prop-types";
import "./Tournament.css";
import pencil from "./pencil.png";
import trash from "./trash.png";

const Tournament = ({ name, id }) => {
  async function deleteTournament(){
    let req = window.request('/tournament',{method:'DELETE',body:JSON.stringify({id})});
    console.log(req);
  }
  return (
    <div className="Tournament">
      {name}
      <right>
        <img src={pencil} />
        <img onClick={deleteTournament} src={trash} />
      </right>
    </div>
  );
};

Tournament.propTypes = {};

Tournament.defaultProps = {};

export default Tournament;
