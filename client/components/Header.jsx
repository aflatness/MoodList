import React from 'react';
import Cookies from 'js-cookie';
import Logo from '../Styles/Spotify_Icon_RGB_White.png';

const Header = ({ user, loggedIn }) => {
  const logOut = () => {
    Cookies.remove('spotify-auth-session');
    loggedIn(false);
  }
  return (
    <div id='header'>
      <div id='header-title'>
        <img id='header-logo' src={Logo} alt='sp-black-icon'></img>
        MoodList
        <div id='logout' onClick={logOut}>Log out</div>
        <div id='header-name'>{user.displayName}</div>
        <img id='header-profile-pic' src={user.profilePic} alt='profile-pic'></img>
      </div>
    </div>
  )
}

export default Header;