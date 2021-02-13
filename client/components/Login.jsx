import React from 'react';

const Login = () => (
  <div id='login-page'>
    <div id='login-title'>Playify</div>
    <div id='login-note'>Login with Spotify!</div>
    <button id='login-btn' ><a href='/auth/spotify'>Login to Spotify</a></button>
  </div>
);

export default Login;