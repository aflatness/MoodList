import React from 'react';
import Cookies from 'js-cookie';

const Header = ({ user, loggedIn }) => {
  const logOut = () => {
    Cookies.remove('spotify-auth-session');
    loggedIn(false);
  }
  return (
    <div id='header'>
      <div id='header-title'>Playify
        <div id='logout' onClick={logOut}>Log out</div>
        <div id='header-name'>{user.displayName}</div>
        <img src={user.profilePic} alt='profile-pic'></img>
      </div>
    </div>
  )
}

export default Header;