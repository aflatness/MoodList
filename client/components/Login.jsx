import React from 'react';
import Logo from '../Styles/Spotify_Icon_RGB_Black.png'

const Login = () => (
  <div id='login-page'>
    <div id='login-title'>MoodList</div>
    <div id='login-note'>Find the perfect playlist currated to your current mood.</div>
    <button id='login-btn' ><a href='/auth/spotify'>
      <img src={Logo} alt='sp-black-icon'></img>
      Login with Spotify</a></button>
  </div>
);

export default Login;