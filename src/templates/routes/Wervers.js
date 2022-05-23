import React from 'react';
import { useQuery } from 'react-query';
import { Button } from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';

export default function Wervers(props) {
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [poule, setPoule] = useState('')
    const [refresh, setRefresh] = useState(0)
    const [deleteWerver, setDeleteWerver] = useState('')

    const { isLoading, data } = useQuery('atlas-wervers', () => {
        return axios.get('https://atlas-website-backend.herokuapp.com/get-wervers')
    })

    let wervers
    function waitForElement() {
        if (props.data.data !== null) {
            wervers = props.data.map(row => row[1]).map(name => <tr key={name}><td>{name}</td></tr>)
        }
        else {
            setTimeout(waitForElement, 100)
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
            setRefresh(() => refresh + 1)
        }
        uploadWerver(werver)
    }

    const handleDelete = () => {
        const werverToDelete = {
            name: deleteWerver,
        }
        async function deleteWerverName(werverName) {
            const deleteWerver = await axios.post('http://localhost:3001/delete-user', werverName)
        }
        deleteWerverName(werverToDelete)
    }

    if (isLoading) {
        return <h2>Loading bitch ...</h2>
    }

    return (
        <>
            <div className='grid grid-cols-2 gap-4 justify-center items-center p-5 mx-auto'>
                <div>
                    <h1>Sales Professionals+</h1>
                    <table className='w-full border-2 border-zinc-500 rounded-t-md overflow-hidden'>
                        <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Status</th>
                                <th>Poule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map(werver => {
                                if (werver.status === 'SP') {
                                    return (
                                        <>
                                            <tr key={werver.name}
                                                className='border-b-2 border-zinc-500'>
                                                <td>{werver.name}</td>
                                                <td className='italic'>{werver.status}</td>
                                                <td className='italic'>{werver.poule ? werver.poule : '-'}</td>
                                            </tr>
                                        </>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className='grid w-4/5 bg-zinc-200 rounded-lg p-2 mt-0'>
                        <h1 className='text-xl text-center font-bold'>Werver toevoegen</h1>
                        <label htmlFor='naam'>Naam: </label>
                        <input type='text' name='naam' id='naam' className='m-2 p-2 rounded-lg' placeholder='Voor- en achternaam' onChange={e => { setName(e.target.value) }}></input>
                        <label htmlFor='status'>Functie: </label>
                        <input type='text' name='status' id='status' className='m-2 p-2 rounded-lg' placeholder='Status' onChange={e => { setStatus(e.target.value) }}></input>
                        <label htmlFor='poule'>Poule: </label>
                        <input type='text' name='poule' id='poule' className='m-2 p-2 rounded-lg' placeholder='Poule (optioneel)' onChange={e => { setPoule(e.target.value) }}></input>
                        <Button onClick={handleSubmit} variant='primary' type='submit' className='m-2'>Registreer</Button>{' '}
                    </div>
                    <div className='grid w-4/5 bg-zinc-200 rounded-lg p-2 mt-6'>
                        <h1 className='text-xl text-center font-bold'>Werver verwijderen</h1>
                        <label htmlFor='del-naam'>Naam: </label>
                        <input type='text' name='del-naam' id='del-naam' className='m-2 p-2 rounded-lg' placeholder='Voor- en achternaam' onChange={e => { setDeleteWerver(e.target.value) }}></input>
                        <Button onClick={handleDelete} variant='primary' type='submit' className='m-2'>Verwijder</Button>{' '}
                    </div>

                </div>
                <div>
                    <h1>Promotors</h1>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Poule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map(werver => {
                                if (werver.status === 'P') {
                                    return (
                                        <tr key={werver.name}>
                                            <td>{werver.name}</td>
                                            <td>{werver.poule ? werver.poule : '-'}</td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h1>Shark Tank</h1>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Poule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map(werver => {
                                if (werver.status === 'ST') {
                                    return (
                                        <tr key={werver.name}>
                                            <td>{werver.name}</td>
                                            <td>{werver.poule ? werver.poule : '-'}</td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
