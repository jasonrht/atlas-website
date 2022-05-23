import React, { useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import InputTracker from './components/InputTracker'

export default function Pasjes() {
    const [name, setName] = useState('')
    const [selectedOption, setSelectedOption] = useState([])
    const [selectedLocation, setSelectedLocation] = useState([])
    const [photo, setPhoto] = useState(null)
    const [birthday, setBirthday] = useState('')
    const handleSubmit = async () => {
        console.log(selectedOption)
        console.log(selectedLocation)
        let fd = new FormData()
        fd.append('file', photo)
        fd.append('naam', name)
        fd.append('vestiging', selectedLocation.map(loc => loc.label))
        fd.append('project', selectedOption.map(project => project.label))
        fd.append('geboortedatum', birthday)
        const res = await axios.post('http://localhost:3001/new-pass', fd)
        // console.log(res)
    }

    const handleSelect = (event) => {
        const status = event.target.checked
        const value = event.target.id
        // console.log([status, value])
        return status && value ?
            setSelectedLocation([selectedLocation].push(value))
            : setSelectedLocation([selectedLocation].filter(val => val !== value))
    }

    const locationOptions = [
        { value: 'rtm-hq', label: 'Rotterdam HQ' },
        { value: 'utr', label: 'Utrecht' },
        { value: 'ams', label: 'Amsterdam' },
    ]

    const projectOptions = [
        { value: 'ba', label: 'Breadline Africa' },
        { value: 'ca', label: 'Cordaid' },
        { value: 'ifaw', label: 'IFAW' },
        { value: 'oxfam', label: 'Oxfam Novib' },
        { value: 'beatrix', label: 'Prinses Beatrix Spierfonds' },
        { value: 'simavi', label: 'Simavi' },
        { value: 'svhk', label: 'Stichting van het Kind' },
        { value: 'wilde-ganzen', label: 'Wilde Ganzen' },
    ]

    return (
        <div className='w-screen h-screen p-4'>
            <div className='flex flex-col w-[70%] h-[90%] bg-zinc-200 mx-auto p-4 justify-between rounded-t-md'>
                <h1 className='text-center'>Pas Aanvragen</h1>
                <div>
                    <label htmlFor='naam'>Naam:</label>
                    <input id='naam' name='naam' type='text'
                        placeholder='Voor- en Achternaam'
                        className='ml-4 p-2 rounded-sm'
                        onChange={e => setName(e.target.value)}></input>
                </div>
                <label htmlFor='location-options'>Kies Vestiging(en):</label>
                <Select
                    id='location-options'
                    options={locationOptions}
                    onChange={setSelectedLocation}
                    isMulti
                    placeholder='Kies Vestiging(en)' />
                <label htmlFor='project-options'>Kies Project(en):</label>
                <Select
                    id='project-options'
                    onChange={setSelectedOption}
                    options={projectOptions}
                    isMulti
                    placeholder='Kies Project(en)' />
                <form>
                    <label htmlFor='pasfoto'>Voeg hier je pasfoto toe:</label>
                    <input type='file' accept='image/*' id='file' name='file'
                        className='ml-4 p-2 rounded-sm'
                        onChange={file => {
                            setPhoto(file.target.files[0])
                        }}></input>
                </form>
                <div>
                    <label htmlFor='geboortedatum'>Geboortedatum: </label>
                    <input type='date'
                        className='ml-4 p-2 rounded-sm'
                        onInput={input => setBirthday(input.target.value)}
                        max={`${(new Date()).getFullYear() - 17}-12-31`}></input>
                </div>
                <button onClick={() => handleSubmit()}
                    type='submit'
                    className='bg-blue-500 rounded-sm'>
                    Aanvragen
                </button>
            </div>
        </div>
    )
}
