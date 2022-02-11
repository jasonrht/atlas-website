import React from 'react';
import { Button } from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';

export default function Wervers(props) {
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [poule, setPoule] = useState('')

    let wervers
    function waitForElement(){
        if(props.data.data !== null) {
            wervers = props.data.map(row => row[1]).map(name => <tr key={name}><td>{name}</td></tr>)
        }
        else{
            setTimeout(waitForElement,100)
        }
    }
    waitForElement()

    const handleSubmit = () => {
        const werver = {
            name: name,
            status: status,
            poule: poule,
        }
        async function uploadWerver(werverData) {
            const upload = await axios.post('https://atlas-website-backend.herokuapp.com/add-werver', werverData)
            console.log('new werver added !')
        }
        uploadWerver(werver)
    }

    return (
      <>
      <div className='justify-center items-center'>
          {/* <table>
            <thead>
                <tr>
                    <th>Naam</th>
                    <th>Poule</th>
                </tr>
            </thead>
            <tbody>
                {wervers}
            </tbody>
          </table> */}
          <div>
              <form>
                    <label htmlFor='email'>Naam: </label>
                    <input type='text' name='naam' id='naam' className='m-2 p-2' placeholder='Voor- en achternaam' onChange={e => {setName(e.target.value)}}></input>
                    <label htmlFor='status'>Status: </label>
                    <input type='text' name='status' id='status' className='m-2' placeholder='Status' onChange={e => {setStatus(e.target.value)}}></input>
                    <label htmlFor='poule'>Poule: </label>
                    <input type='text' name='poule' id='poule' className='m-2 p-2' placeholder='Poule (optioneel)' onChange={e => {setPoule(e.target.value)}}></input>
                    <Button onClick={handleSubmit} variant='primary' type='submit' className='m-2'>Registreer</Button>{' '}
              </form>
          </div>
      </div>
      </>
    )
    }
