import React, { useState } from 'react';
import Header from './Header.jsx';
import MoodForm from './MoodForm.jsx';
import History from './History.jsx';

const Dashboard = ({ user, loggedIn, setUser, getData }) => {
  const [show, setShow] = useState('moodSlider');

  return (
    <div>
      <Header user={user} loggedIn={loggedIn} setShow={setShow} />
      {show === 'history' ? <History history={user.moodHistory} /> : <MoodForm user={user} setUser={setUser} getData={getData} />}
    </div>
  )
}

export default Dashboard;