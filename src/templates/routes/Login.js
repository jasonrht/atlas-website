import React, { useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Table from './components/Table'

export default function Login({ setLoginStatus }) {
    const [username, setUsername] = useState('')
    const [pw, setPW] = useState('')
    const [loginFail, setLoginFail] = useState(false)
    // const [auth, setAuth] = useState(true)

    let navigate = useNavigate()

    const handleLogin = () => {
        let user = {
            user: username,
            password: pw,
        }

        async function checkUsers(loginData) {
            let authenticated = false
            await axios.post('https://atlas-website-backend.herokuapp.com/users/login', loginData)
                .then(res => {
                    authenticated = res.data.authenticated
                    if (authenticated) {
                        console.log('user authenticated !')
                        navigate('/', { replace: true })
                        localStorage.setItem('token', res.data.token)
                        setLoginStatus(true)
                    }
                    else {
                        // alert('Login failed, try again ...')
                        setLoginFail(true)
                        res.send('user not authenticated ...')
                    }
                })
        }
        checkUsers(user)
        // if(localStorage.getItem('token')){
        //     <Navigate to='/leaderboards' replace={true}/>
        //     console.log('redirected to leaderboards !')
        // } else {
        //     <Navigate to='/login' replace={true}/>
        //     console.log('redirected to login page !')
        // }
    }

    return (
        <>
            {/* {localStorage.getItem && <Navigate to='/leaderboards' />}  */}
            <Container className='w-screen h-screen flex justify-content-center align-items-center -mt-[10%]'>
                <Card className='-top-10 w-4/5 h-3/4 overflow-hidden shadow-lg md:w-1/3 md:h-1/2'>
                    <Card.Body className='flex flex-col align-items-center justify-content-center p-0 rounded-md border-2 border-black'>
                        <Card.Title className='mt-1 mb-5'>Login</Card.Title>
                        <label htmlFor='username'>Naam: </label>
                        <input onChange={e => { setUsername(e.target.value) }} type='text' name='username' id='username' className='m-2 max-w-full border-2 border-black rounded-md p-2' placeholder='Gebruikersnaam'></input>
                        <label htmlFor='password'>Wachtwoord: </label>
                        <input onChange={e => { setPW(e.target.value) }} type='password' name='password' id='password' className='m-2 max-w-full border-2 border-black rounded-md p-2' placeholder='Wachtwoord'></input>
                        <Button variant='primary' className='m-2' onClick={handleLogin}>Login</Button>{' '}
                        {loginFail && <p className='text-red-500 mt-4'>Inloggen mislukt, probeer opnieuw ...</p>}
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

