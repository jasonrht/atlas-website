import React from 'react';
import { useState } from 'react';
import LbTable from './LbTable';

export default function BackupLBs() {
  const today = new Date()
  const options = {month: 'long'}
  const currentMonth = new Intl.DateTimeFormat('nl-NL', options).format(today)
  const currentYear = today.getFullYear().toString()

  const [backups, setBackups] = useState([])
  const [month, setMonth] = useState(today.getMonth()+1)
  const [year, setYear] = useState(today.getFullYear())

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

  React.useEffect(() => {
    try {
      fetch("http://localhost:3001/backups")
      .then((res) => res.json())
      .then((apiData) => {
        console.log(apiData)
        setBackups(apiData)
        console.log('backup data fetched and set !')
      });
    } catch(e) {
      console.log(e)
    }
  }, [])
  
  const tables = backups.map(table => <LbTable data={table.data} name={`Backup`}/>).reverse()
  console.log(tables)

  const selectMonth = (selectedMonth) => {
    const value = selectedMonth.target.value
    setMonth(monthJSON[value])
  }

  const selectYear = (selectedYear) => {
      const value = selectedYear.target.value
      setYear(value)
  }
  
  return (
    <>
    <form>
        <select className='m-2' id='months' defaultValue={currentMonth} onChange={selectMonth}>
            {months}
        </select>
        <select id='years' defaultValue={currentYear} onChange={selectYear} className='mr-1'>
            {years}
        </select>
    </form>
      {tables}
    </>
  )
}
