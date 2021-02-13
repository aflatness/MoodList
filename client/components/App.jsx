import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';

const App = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(Cookies.get('spotify-auth-session') !== undefined);
  const [user, setUser] = useState({})

  useEffect(() => {
    const cook = Cookies.get('spotify-auth-session')
    console.log(cook)
    if (cook) {
      const obj = JSON.parse(Cookies.get('spotify-auth-session'));
      setLoggedIn(true)
      setUser(obj)
    }
  }, [Cookies.get('spotify-auth-session'), isLoggedIn])

  console.log(isLoggedIn, user)
  return ( isLoggedIn ? <Dashboard user={user} loggedIn={setLoggedIn}/> : <Login />
  )
}

export default App;
