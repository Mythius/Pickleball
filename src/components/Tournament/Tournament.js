import React from "react";
import PropTypes from "prop-types";
import "./Tournament.css";
import pencil from "./pencil.png";
import trash from "./trash.png";
import join from './join.png';
import { createPromptBox } from "../../control";

const Tournament = ({ name, id }) => {
  async function deleteTournament(){
    let req = window.request('/tournament/'+id,{method:'DELETE'});
    console.log(req);
  }

  async function joinTourney(){
    let teamName = await createPromptBox('Enter Team Name');
    if(!teamName) return;
    let req = await window.request(`/join-tournament/${id}/${teamName}`,{method:'POST'});
    if(req.message=='Success'){
      setTimeout(()=>{window.location=`tournament?id=${id}&tname=${teamName}`},350);
    }
  }

  return (
    <div className="Tournament">
      {name}
      <right>
        <img onClick={joinTourney} src={join} />
        <img onClick={deleteTournament} src={trash} />
      </right>
    </div>
  );
};

Tournament.propTypes = {};

Tournament.defaultProps = {};

export default Tournament;
