import './styling/App.css';
import React from 'react';
import Navigation from './Navigation';
import Leaderboards from './templates/routes/leaderboards/Leaderboards';
import Registration from './templates/routes/Registration';
import Login from './templates/routes/Login';
import Wervers from './templates/routes/Wervers';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import BackupLBs from './templates/routes/BackupLBs';

function App() {
  const [apiData, setApiData] = React.useState({data: null});
  const [loginStatus, setLoginStatus] = React.useState(false);

  React.useEffect(() => {
    try {
      fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((apiData) => {
        setApiData(apiData.data)
        console.log('api data fetched and set !')
      });
    } catch(e) {
      console.log(e)
    }
  }, []);

  axios.get('http://localhost:3001/userAuth', {
    headers: {
      'authorization': localStorage.getItem('token')
    }}
  ).then(res => {
    if(res.data === null) {
      setLoginStatus(false)
    }
    else {
      setLoginStatus(true)
    }
  })

  console.log(`loginStatus: ${loginStatus}`)

  if(!loginStatus) {
    return (
      <>
        <Navigation status={loginStatus}/>
        <Login setLoginStatus={setLoginStatus}/>
      </>
    )
  } else {
      return (
        <>
        <Navigation status={loginStatus} />
        
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration data={apiData} />} />
          <Route path='/leaderboards' element={<Leaderboards data={apiData} />} />
          <Route path='/wervers' element={<Wervers data={apiData} />} />
          <Route path='/backup-lbs' element={<BackupLBs />} />
        </Routes>
        </>
      );
  }
}

export default App;
