import React, { useState } from 'react'
import { Button, Container, Nav, NavDropdown, Form } from 'react-bootstrap'
import Leaderboard from './Leaderboard'
import BackupLBs from '../BackupLBs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Table from '../components/Table'
import InputTracker from '../components/InputTracker'


export default function Leaderboards(props) {
    const today = new Date()
    const options = { month: 'long' }
    const currentMonth = new Intl.DateTimeFormat('nl-NL', options).format(today)
    const currentYear = today.getFullYear().toString()

    const [month, setMonth] = useState(today.getMonth() + 1)
    const [year, setYear] = useState(today.getFullYear())
    const [backup, setBackup] = useState(false)

    const [table, setTable] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [refreshTime, setRefreshTime] = useState('')

    function showLeaderboard(lb, tbName) {
        const sp = ["Abdi Ali", "Arjan Noordermeer", "Britt Gruntjes", "Camille Montoux",
            "Eefje Groot Koerkamp", "Geneau Bodden", "Mathis Montoux", "Moos Minkes", "Owen Maas",
            "Rick Kerkhoven", "Sander Boesten", "Ted Hulshof", "Thijs Bakker", "Tim Chibanov",
            "Wijnand Hoofs", "Willemijn Renzen", "Wouter Wissema", "Yannick O'Callaghan", "Max Scholsberg",
            "Ismael El Hamouchi", "Jethro Swennen", "Ferry Biesheuvel", "Luke Hermes", "Jelle van Eck", "Luc van der Vorm"]
        const st = ["Boris Ruijtenbeek", "Brett Taument", "David Migo", "Giovanni Melissant",
            "Joep Koolen", "Luuc Marchand", "Quentin Booi"]
        const promotors = ["Oscar Martinez", "Rosa de Kiefte", "Simon Knotnerus"]
        console.log(`Leaderboard set to ${lb}`);
        let lbName = lb;
        if (lbName === 'algemeen') {
            setTable(() =>
                <>
                    <Table wervers={sp} tablename='Sales Professionals+' />
                    <Table wervers={promotors} tablename='Promotors' />
                    <Table wervers={st} tablename='Shark Tank' />
                </>
            )
        } else {
            setTable(() => <Table wervers={lbName} tablename={tbName} />)
        }
    }

    const monthNames = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September',
        'Oktober', 'November', 'December']
    let monthJSON = {}
    for (let i = 0; i < monthNames.length; i++) {
        monthJSON[monthNames[i].toLowerCase()] = i + 1
    }
    const months = monthNames.map(function (monthName) {
        if (monthName.toLowerCase() === currentMonth) {
            return <option value={monthName.toLowerCase()} key={monthName}>{monthName}</option>
        } else {
            return <option value={monthName.toLowerCase()} key={monthName}>{monthName}</option>
        }
    })

    const yearNames = ['2022', '2021', '2020', '2019'] //<option key={name}>{name}</option>
    const years = yearNames.map(function (yearName) {
        if (yearName === today.getFullYear.toString()) {
            return <option value={yearName} key={yearName}>{yearName}</option>
        } else {
            return <option value={yearName} key={yearName}>{yearName}</option>
        }
    })

    const refreshData = () => {
        const t = new Date()
        const refreshTime = `${t.getDate()}-${t.getMonth() + 1}-${t.getFullYear()} ${t.getHours()}:${t.getMinutes() < 10 ? '0'.concat(t.getMinutes()) : t.getMinutes()}`
        setRefreshTime(refreshTime)
        console.log('refreshing data ...')
        setRefresh(true)

        axios.get('http://localhost:3001/get-wervers', (req, res) => {
            console.log(res)
        })

        axios.post('https://atlas-website-backend.herokuapp.com/dates', {
            selectedMonth: month,
            selectedYear: year,
            backup: backup,
        })
            .then(console.log('dates posted successfully !'))

        axios.get('https://atlas-website-backend.herokuapp.com/scrape-data')
            .then(res => {
                if (res) {
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
        navigate('/backup-lbs', { replace: true })
    }


    const apexWervers = ['Britt Gruntjes', 'Ismael El Hamouchi', 'Camille Montoux',
        'Jethro Swennen', 'Max Scholsberg', "Yannick O'Callaghan"]
    const papyrusWervers = ['Jelle van Eck', "Yannick O'Callaghan", 'Oscar Martinez', 'Boris Ruijtenbeek', 'Arjan Noordermeer']
    const jethroWervers = ['Rosa de Kiefte', 'Wijnand Hoofs', 'Owen Maas', 'David Migo', 'Simon Knotnerus', 'Jethro Swennen', 'Luc van der Vorm']
    const hermesWervers = ['Brett Taument', 'Quentin Booi', 'Luke Hermes', 'Luux Marchand', 'Ian Hermes']
    const ismaelWervers = ['Ismael El Hamouchi', 'Willemijn Renzen']
    return (
        <>
            <Nav className='ml-4' variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={() => showLeaderboard('algemeen', "algemeen")}>Algemeen</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => showLeaderboard(apexWervers, "APEX")}>Atlas Apex</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <NavDropdown title="Poules" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => showLeaderboard(papyrusWervers, "Nino's Poule")}>Nino's Poule</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => showLeaderboard(jethroWervers, "Jethro's Poule")}>Jethro's Poule</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => showLeaderboard(hermesWervers, "Hermes Poule")}>Luke & Ian's Poule</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => showLeaderboard(ismaelWervers, "Ismael's Poule")}>Ismael's Poule</NavDropdown.Item>
                    </NavDropdown>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleBackupClick}>Backups</Nav.Link>
                </Nav.Item>
            </Nav>

            <div className='ml-4 mt-2 w-100 h-100 align-center justify-content-center'>
                <form>
                    <select id='months' defaultValue={currentMonth} onChange={selectMonth}>
                        {months}
                    </select>
                    <select id='years' defaultValue={currentYear} onChange={selectYear} className='mr-1'>
                        {years}
                    </select>
                    <input className='m-1' type='checkbox' id='backup' name='backup' onClick={handleBackupCheck} />
                    <label htmlFor='backup' className='m-1'>Back-Up</label>
                    <Button onClick={refreshData}>Refresh data</Button>
                    <p>{`Last update: ${refreshTime}`}</p>
                </form>
                {refresh && (
                    <p className='mt-1'>Refreshing data ...</p>
                )}
                {table}
            </div>

        </>
    )
}
