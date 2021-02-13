import React from 'react';

const Login = () => (
  <div id='login-page'>
    <div id='login-title'>MoodList</div>
    <div id='login-note'>Find the perfect playlist currated to your current mood.</div>
    <button id='login-btn' ><a href='/auth/spotify'>
      <img src='../client/Styles/Spotify_Icon_RGB_Black.png' alt='sp-black-icon'></img>
      Login with Spotify</a></button>
  </div>
);

export default Login;