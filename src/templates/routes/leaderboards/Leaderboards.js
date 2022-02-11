import React, { useState } from 'react'
import { Button, Container, Nav, NavDropdown, Form } from 'react-bootstrap'
import Leaderboard from './Leaderboard'
import BackupLBs from '../BackupLBs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Leaderboards(props) {
    const today = new Date()
    const options = {month: 'long'}
    const currentMonth = new Intl.DateTimeFormat('nl-NL', options).format(today)
    const currentYear = today.getFullYear().toString()

    const [month, setMonth] = useState(today.getMonth()+1)
    const [year, setYear] = useState(today.getFullYear())
    const [backup, setBackup] = useState(false)

    const [table, setTable] = useState('')
    const [refresh, setRefresh] = useState(false)

    const allData = props.data
    function showLeaderboard(lb) {
        console.log(`Leaderboard set to ${lb}`);
        let lbName = lb;
        setTable(() => <Leaderboard name={lbName} data={allData}/>)
    }

    const monthNames = ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September',
                        'Oktober','November','December']
    let monthJSON = {}
    for(let i=0; i<monthNames.length; i++) {
        monthJSON[monthNames[i].toLowerCase()] = i+1
    }
    const months = monthNames.map(function(monthName) {
        if(monthName.toLowerCase() === currentMonth) {
            return <option value={monthName.toLowerCase()} key={monthName}>{monthName}</option>
        } else {
            return <option value={monthName.toLowerCase()} key={monthName}>{monthName}</option>
        }
    })

    const yearNames = ['2022','2021','2020','2019'] //<option key={name}>{name}</option>
    const years = yearNames.map(function(yearName) {
        if(yearName === today.getFullYear.toString()) {
            return <option value={yearName} key={yearName}>{yearName}</option>
        } else {
            return <option value={yearName} key={yearName}>{yearName}</option>
        }
    })

    const refreshData = () => {
        console.log('refreshing data ...')
        setRefresh(true)

        axios.post('https://atlas-website-backend.herokuapp.com/dates', {
            selectedMonth: month,
            selectedYear: year,
            backup: backup,
        })
        .then(console.log('dates posted successfully !'))

        axios.get('https://atlas-website-backend.herokuapp.com/refresh-data')
        .then(res => {
            if(res){
                console.log(res)
                setRefresh(false)
            }
        })
    }

    const selectMonth = (selectedMonth) => {
        const value = selectedMonth.target.value
        setMonth(monthJSON[value])
    }

    const selectYear = (selectedYear) => {
        const value = selectedYear.target.value
        setYear(value)
    }

    const handleBackupCheck = (e) => {
        setBackup(e.target.checked)
    }

    let navigate = useNavigate()
    const handleBackupClick = () => {
        navigate('/backup-lbs', {replace: true})
    }

    return (
        <>
            <Nav className='ml-4'variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={() => showLeaderboard('algemeen')}>Algemeen</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => showLeaderboard('apex')}>Atlas Apex</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <NavDropdown title="Poules" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => showLeaderboard('nino')}>Nino's Poule</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => showLeaderboard('jethro')}>Jethro's Poule</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => showLeaderboard('hermes')}>Luke & Ian's Poule</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => showLeaderboard('ismael')}>Ismael's Poule</NavDropdown.Item>
                    </NavDropdown>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleBackupClick}>Backups</Nav.Link>
                </Nav.Item>
            </Nav>
            <div className='ml-4 mt-2'>
                <form>
                    <select id='months' defaultValue={currentMonth} onChange={selectMonth}>
                        {months}
                    </select>
                    <select id='years' defaultValue={currentYear} onChange={selectYear} className='mr-1'>
                        {years}
                    </select>
                    <input className='m-1' type='checkbox' id='backup' name='backup' onClick={handleBackupCheck}/>
                    <label htmlFor='backup' className='m-1'>Back-Up</label>
                    <Button onClick={refreshData}>Refresh data</Button>
                </form>
                {refresh && (
                    <p className='mt-1'>Refreshing data ...</p>
                )}
                { table }
            </div>
            
        </>
    )
}
