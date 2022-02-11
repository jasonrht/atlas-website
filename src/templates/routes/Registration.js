import React from 'react'
import { Button, Card, Container, Table } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

export default function Registration(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [poule, setPoule] = useState('')

    const handleSubmit = () => {
        let user = {
            username: userName,
            password: password,
            name: name,
            email: email,
            poule: poule,
        }

        async function uploadUser(userData) {
            const upload = await axios.post('http://localhost:3001/add-user', userData)
            console.log('User posted to user-API!')
        }
        uploadUser(user)
    }
    
    console.log(props.data.data)
    let wervers
    function waitForElement(){
        if(props.data.data !== null) {
            wervers = props.data.map(row => row[1]).map(name => <tr key={name}><td>{name}</td><td>-</td></tr>)
        }
        else{
            setTimeout(waitForElement,100)
        }
    }
    waitForElement()
    

    return (
        <Container className='w-screen h-screen flex justify-content-center align-items-center'>
        <Table className='mt-auto mr-5 w-50'>
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
        <Card className='-top-4 w-1/3'>
            <Card.Body className='flex flex-col align-items-center justify-content-center p-0'>
                <Card.Title className='mt-1 mb-4'>Registreer nieuwe gebruiker</Card.Title>
                    <label htmlFor='username'>Gebruikersnaam: </label>
                    <input type='text' name='username' id='username' className='m-2 p-2 border-solid' placeholder='Gebruikersnaam' onChange={e => {setUserName(e.target.value)}}></input>
                    <label htmlFor='email'>Naam: </label>
                    <input type='text' name='naam' id='naam' className='m-2 p-2' placeholder='Voor- en achternaam' onChange={e => {setName(e.target.value)}}></input>
                    <label htmlFor='email'>Email: </label>
                    <input type='text' name='email' id='email' className='m-2 p-2' placeholder='Email' onChange={e => {setEmail(e.target.value)}}></input>
                    <label htmlFor='password'>Wachtwoord: </label>
                    <input type='password' name='password' id='password' className='m-2' placeholder='Wachtwoord' onChange={e => {setPassword(e.target.value)}}></input>
                    <label htmlFor='password'>Poule: </label>
                    <input type='text' name='poule' id='poule' className='m-2 p-2' placeholder='Poule' onChange={e => {setPoule(e.target.value)}}></input>
                    <Button onClick={handleSubmit} variant='primary' type='submit' className='m-2'>Registreer</Button>{' '}
            </Card.Body>
        </Card>
        </Container>
    )
}
