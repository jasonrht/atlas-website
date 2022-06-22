import React, { useState } from 'react'
import axios from 'axios'
import InputTracker from './components/InputTracker'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom'



export default function Pasjes() {
    const [name, setName] = useState('')
    const [selectedOption, setSelectedOption] = useState([])
    const [selectedLocation, setSelectedLocation] = useState([])
    const [photo, setPhoto] = useState(null)
    const [birthday, setBirthday] = useState('')
    const [personName, setPersonName] = React.useState([]);
    const [submitted, setSubmitted] = useState(false)
    const [invalidSubmit, setInvalidSubmit] = useState(false)
    let navigate = useNavigate()

    const postData = async (formData) => {
        setInvalidSubmit(false)
        setSubmitted(true)
        navigate('/aanvraag-succes', { replace: true })
        const res = await axios.post('https://atlas-website-backend.herokuapp.com/new-pass', formData)
        // const res = await axios.post('https://localhost:3001/new-pass', formData)
        // console.log(`res: ${res}`)
    }

    const handleSubmit = async () => {
        console.log(selectedOption)
        console.log(selectedLocation)
        let fd = new FormData()
        fd.append('file', photo)
        fd.append('naam', name)
        fd.append('vestiging', selectedLocation)
        fd.append('project', selectedOption)
        fd.append('geboortedatum', birthday)
        photo && name && selectedLocation && selectedOption && birthday ?
            await postData(fd) :
            setInvalidSubmit(true)
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedOption(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        // console.log(selectedOption)
    };

    const handleLocation = (event) => {
        const locs = {
            'rtm-hq': 'Rotterdam HQ',
            'utr': 'Utrecht',
            'ams': 'Amsterdam',
            'apd': 'Apeldoorn',
            'nmg': 'Nijmegen',
        }
        // console.log(locs[event.target.value])
        setSelectedLocation(event.target.value)
    }

    const locationOptions = [
        { value: 'rtm-hq', label: 'Rotterdam' },
        { value: 'utr', label: 'Utrecht' },
        { value: 'ams', label: 'Amsterdam' },
        { value: 'apd', label: 'Apeldoorn' },
        { value: 'nmg', label: 'Nijmegen' },
    ]

    const projectOptions = [
        { value: 'ba', label: 'Breadline Africa' },
        { value: 'ca', label: 'Cordaid' },
        { value: 'ifaw', label: 'IFAW' },
        { value: 'oxfam', label: 'Oxfam Novib' },
        { value: 'beatrix', label: 'Prinses Beatrix Spierfonds' },
        { value: 'simavi', label: 'Simavi' },
        { value: 'svhk', label: 'Stichting van het Kind' },
        { value: 'unhcr', label: 'UNHCR' },
        { value: 'wilde-ganzen', label: 'Wilde Ganzen' },
    ]

    return (
        <div className='w-screen h-screen p-4 max-h-[40rem]'>
            <div className='flex flex-col w-[90%] md:w-[70%] h-[90%] bg-zinc-200 mx-auto p-4 justify-between rounded-md border-2 border-black'>
                <h1 className='text-center'>Pas Aanvragen</h1>
                <div>
                    <label htmlFor='naam'>Naam:</label>
                    <input id='naam' name='naam' type='text'
                        placeholder='Voor- en Achternaam'
                        className='md:ml-4 p-2 rounded-md border-2 border-black'
                        required
                        onChange={e => setName(e.target.value)}></input>
                </div>
                <FormControl required >
                    <InputLabel className='text-black' id="demo-multiple-checkbox-label">Kies Project(en)</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectedOption}
                        onChange={handleChange}
                        renderValue={(selected) => selected.join(', ')}
                        input={<OutlinedInput label="Kies Project(en)" />}
                        // className='border-2 border-black'
                        variant='filled'
                    >
                        {projectOptions.map((project) => (
                            <MenuItem key={project.label} value={project.label}>
                                <Checkbox checked={selectedOption.indexOf(project.label) > -1} />
                                <ListItemText primary={project.label} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <form>
                    <label htmlFor='pasfoto'>Voeg hier je pasfoto toe:</label>
                    <input type='file' accept='image/*' id='file' name='file'
                        className='md:ml-4 p-2 rounded-sm'
                        required
                        onChange={file => {
                            setPhoto(file.target.files[0])
                        }}></input>
                    <div className='mt-4'>
                        <label htmlFor='geboortedatum'>Geboortedatum: </label>
                        <input type='date'
                            className='ml-2 md:ml-4 p-2 rounded-md border-2 border-black'
                            onInput={input => setBirthday(input.target.value)}
                            required
                            max={`${(new Date()).getFullYear() - 15}-12-31`}></input>
                    </div>
                </form>
                <FormControl required>
                    <InputLabel className='text-black' id="demo-simple-select-label">Kies Vestiging</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedLocation}
                        label="Vestiging"
                        onChange={handleLocation}
                        variant='outlined'
                    >
                        <MenuItem value='ams'>Amsterdam</MenuItem>
                        <MenuItem value='apd'>Apeldoorn</MenuItem>
                        <MenuItem value='nmg'>Nijmegen</MenuItem>
                        <MenuItem value='rtm-hq'>Rotterdam</MenuItem>
                        <MenuItem value='utr'>Utrecht</MenuItem>
                    </Select>
                </FormControl>
                <button onClick={() => handleSubmit()}
                    type='submit'
                    className='bg-blue-500 rounded-md border-black border-2 h-[10%] hover:text-white'>
                    Aanvragen
                </button>
            </div>
            {submitted ? <p className='text-center text-xl mt-2'>Pas aangevraagd !</p> : ''}
            {invalidSubmit ? <p className='text-center text-xl mt-2 text-red-500 italic'>Niet alle velden zijn ingevuld ...</p> : ''}
        </div>
    )
}
