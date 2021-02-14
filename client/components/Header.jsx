import React, { useState, useRef } from 'react';
import Cookies from 'js-cookie';
import Logo from '../Styles/Spotify_Icon_RGB_White.png';
import { Button, Overlay, Popover } from 'react-bootstrap';

const Header = ({ user, loggedIn, setShow, player, setPlayerInit }) => {
  const [overlay, showOverlay] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (e) => {
    showOverlay(!overlay);
    setTarget(e.target);
  }

  const showHistory = () => {
    console.log('history will show');
    setShow('history');
    showOverlay(!overlay);
  }

  const showMoodSlider = () => {
    console.log('Mood slider will show');
    setShow('moodSlider');
    showOverlay(!overlay);
  }

  const logOut = () => {
    Cookies.remove('spotify-auth-session');
    loggedIn(false);
    player.disconnect();
    setPlayerInit(false);
  }
  return (
    <div id='header'>
      <div id='header-title'>
        <img id='header-logo' src={Logo} alt='sp-black-icon'></img>
        MoodList
        <div id='logout' onClick={logOut}>Log out</div>
        <div id='header-name' ref={ref}>
          <div onClick={handleClick}>{user.displayName}</div>
          <Overlay
            show={overlay}
            target={target}
            placement='bottom'
            container={ref.container}
            containerPadding={20}
          >
            <Popover id="popover-contained">
              <Popover.Content onClick={showHistory}>
                See History
              </Popover.Content>
              <Popover.Content onClick={showMoodSlider}>
                Set your mood
              </Popover.Content>
            </Popover>
          </Overlay>
          </div>
        <img id='header-profile-pic' src={user.profilePic} alt=''></img>
      </div>
    </div>
  )
}

export default Header;