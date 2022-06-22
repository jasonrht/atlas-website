import React from 'react'
import { Button, Card, Container, Table } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Registration(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [poule, setPoule] = useState('')
    const [numUsers, setNumUsers] = useState(0)

    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate('/register', { replace: true })
        let user = {
            username: userName,
            password: password,
            name: name,
        }

        async function uploadUser(userData) {
            const upload = await axios.post('https://atlas-website-backend.herokuapp.com/add-user', userData)
            // const upload = await axios.post('http://localhost:3001/add-user', userData)
            console.log('User posted to user-API!')
        }
        uploadUser(user)
    }

    console.log(props.data.data)
    let wervers
    function waitForElement() {
        if (props.data.data !== null) {
            wervers = props.data.map(row => row[1]).map(name => <tr key={name}><td>{name}</td><td>-</td></tr>)
        }
        else {
            setTimeout(waitForElement, 100)
        }
    }
    waitForElement()


    return (
        <Container className='w-screen h-screen grid md:grid-cols-2 md:gap-6 '>
            <Table className='mt-auto mr-5 w-full'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Poule</th>
                    </tr>
                </thead>
                <tbody>
                    {wervers}
                </tbody>
            </Table>
            <Card className='w-min-content h-[40%] ml-4'>
                <Card.Body className='bg-zinc-200 flex flex-col align-items-center justify-content-center p-0 border-2 border-black rounded-md'>
                    <Card.Title className='mt-1 mb-4'>Registreer nieuwe gebruiker</Card.Title>
                    <label htmlFor='username'>Gebruikersnaam: </label>
                    <input type='text' name='username' id='username' className='m-2 p-2 border-2 border-black rounded-md' placeholder='Gebruikersnaam' onChange={e => { setUserName(e.target.value) }}></input>
                    <label htmlFor='email'>Naam: </label>
                    <input type='text' name='naam' id='naam' className='m-2 p-2 border-2 border-black rounded-md' placeholder='Voor- en achternaam' onChange={e => { setName(e.target.value) }}></input>
                    <label htmlFor='password'>Wachtwoord: </label>
                    <input type='password' name='password' id='password' className='m-2 p-2 border-2 border-black rounded-md' placeholder='Wachtwoord' onChange={e => { setPassword(e.target.value) }}></input>
                    <Button onClick={handleSubmit} variant='primary' type='submit' className='m-2'>Registreer</Button>{' '}
                </Card.Body>
            </Card>
            <p>Number of users added: {numUsers}</p>
        </Container>
    )
}
