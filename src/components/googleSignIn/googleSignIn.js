import React from 'react';
import './googleSignIn.css';
import google from './google.png';

const GoogleSignIn = () =>{
  async function signIn(){
    let req = await window.googleAuth();
    await req.loginSuccess;
  }

  return (
  <div className="googleSignIn">
      <img onClick={signIn} id="google-sign-in" src={google} alt="" />
  </div>
)};

export default GoogleSignIn;
