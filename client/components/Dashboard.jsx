import React from 'react';
import Header from './Header.jsx';
import MoodForm from './MoodForm.jsx';

const Dashboard = ({ user, loggedIn}) => {
  return (
    <div>
      <Header user={user} loggedIn={loggedIn} />
      <MoodForm user={user} />
    </div>
  )
}

export default Dashboard;