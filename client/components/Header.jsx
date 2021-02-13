import React from 'react';
import Cookies from 'js-cookie';

const Header = ({ user, loggedIn }) => {
  const logOut = () => {
    Cookies.remove('spotify-auth-session');
    loggedIn(false);
  }
  return (
    <div id='header'>
      <div id='header-title'>
      client/Styles/Spotify_Icon_RGB_White.png
        <img id='header-logo' src='/client/Styles/Spotify_Icon_RGB_White.png' alt='sp-black-icon'></img>
        MoodList
        <div id='logout' onClick={logOut}>Log out</div>
        <div id='header-name'>{user.displayName}</div>
        <img id='header-profile-pic' src={user.profilePic} alt='profile-pic'></img>
      </div>
    </div>
  )
}

export default Header;