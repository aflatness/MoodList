import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import initializePlayer from '../controllers/initializePlayer.js'

const App = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(Cookies.get('spotify-auth-session') !== undefined);
  const [user, setUser] = useState({})
  const [player, setPlayer] = useState({});
  const [playerInit, setPlayerInit] = useState(false);

  useEffect(() => {
    const cook = Cookies.get('spotify-auth-session')
    if (cook) {
      const id = JSON.parse(Cookies.get('spotify-auth-session'));
      setLoggedIn(true)
      getData(id)
    }
  }, [])

  const getData = (id) => {
    axios.get(`https://moodlist-heroku.herokuapp.com/api/user/${id}`)
      .then(({ data }) => {
        data.moodHistory.reverse();
        setUser(data)
        if (!playerInit) {
          let play;
          setTimeout(async () => {
            play = await initializePlayer(data.accessToken)
            setPlayer(play);
            setPlayerInit(true)
          }, 1000);
        }
      })
      .catch((err => console.log(err)))
  }

  return ( isLoggedIn ? <Dashboard user={user} loggedIn={setLoggedIn} setUser={setUser} getData={getData} player={player} setPlayerInit={setPlayerInit} /> : <Login />
  )
}

export default App;
