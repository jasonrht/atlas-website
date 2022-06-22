import './styling/App.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import Navigation from './Navigation';
import Leaderboards from './templates/routes/leaderboards/Leaderboards';
import Registration from './templates/routes/Registration';
import Login from './templates/routes/Login';
import Wervers from './templates/routes/Wervers';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import BackupLBs from './templates/routes/BackupLBs';
import Tables from './templates/routes/Tables';
import Pasjes from './templates/routes/Pasjes';
import Home from './templates/routes/Home'
import AanvraagSucces from './templates/routes/AanvraagSucces';
import LbTable from './templates/routes/LbTable';


const queryClient = new QueryClient()

function App() {
  const [apiData, setApiData] = React.useState({ data: null });
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    try {
      fetch("https://atlas-website-backend.herokuapp.com/api")
        .then((res) => res.json())
        .then((apiData) => {
          setApiData(apiData.data)
          console.log('api data fetched and set !')
        });
    } catch (e) {
      console.log(e)
    }
  }, []);

  axios.get('https://atlas-website-backend.herokuapp.com/userAuth', {
    headers: {
      'authorization': localStorage.getItem('token')
    }
  }
  ).then(res => {
    if (res.data === null) {
      setLoginStatus(false)
    }
    else {
      setLoginStatus(true)
    }
  })

  console.log(`loginStatus: ${loginStatus}`)

  if (!loginStatus) {
    return (
      <>
        <Navigation status={loginStatus} />
        <Login setLoginStatus={setLoginStatus} />
      </>
    )
  } else {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Navigation status={loginStatus} />
          <div className='flex justify-center'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Registration data={apiData} />} />
              <Route path='/leaderboards' element={<LbTable names='' tableName='Atlas Rotterdam' />} />
              <Route path='/wervers' element={<Wervers data={apiData} />} />
              <Route path='/backup-lbs' element={<BackupLBs />} />
              <Route path='/tables' element={<Tables />} />
              <Route path='/pas-aanvraag' element={<Pasjes />} />
              <Route path='/aanvraag-succes' element={<AanvraagSucces />} />
            </Routes>
          </div>
        </QueryClientProvider>
      </>
    );
  }
}

export default App;
