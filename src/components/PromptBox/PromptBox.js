import React from "react";
import "./PromptBox.css";

const PromptBox = ({ label, confirmText, callback, selection }) => {
  let value = "";
  function clicked() {
    callback(value);
  }
  function updateValue(e) {
    value = e.target.value;
  }
  function cancel() {
    callback("");
  }

  setTimeout(() => {
    let c = document.querySelector(".PromptBox");
    c?.querySelector("input")?.focus();
    c?.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        updateValue(e);
        clicked();
      }
    });
  });

  if (selection instanceof Array) {
    return (
      <div className="PromptBox">
        <h4>{label}</h4>
        {selection.map(e=>(<button onClick={()=>{callback(e)}}>{e}</button>))}
      </div>
    );
  }

  return (
    <div className="PromptBox">
      <h4>{label}</h4>
      <input onChange={updateValue} />
      <button onClick={clicked}>{confirmText ? confirmText : "Submit"}</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
};

PromptBox.propTypes = {};

PromptBox.defaultProps = {};

export default PromptBox;
