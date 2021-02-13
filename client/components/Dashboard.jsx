import React, { useState } from 'react';
import Header from './Header.jsx';
import MoodForm from './MoodForm.jsx';
import History from './History.jsx';
import Loading from './Loading.jsx';
import Results from './Results.jsx';

const Dashboard = ({ user, loggedIn, setUser, getData }) => {
  const [show, setShow] = useState('moodSlider');
  const [results, setResults] = useState([]);

  console.log('Showing: ', show)
  console.log('Results are: ', results)
  return (
    <div>
      <Header user={user} loggedIn={loggedIn} setShow={setShow} />
      {show === 'history' ? <History history={user.moodHistory} />
      : show === 'loading' ? <Loading />
      : show === 'results' ? <Results results={results} accessToken={user.accessToken} />
      : <MoodForm user={user} setUser={setUser} getData={getData} setShow={setShow} setResults={setResults} />}
    </div>
  )
}

export default Dashboard;