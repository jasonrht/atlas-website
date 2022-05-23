import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

export default function Table(props) {
  const [data, setData] = useState('')
  const tableName = props.tablename
  const wervers = props.wervers
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://atlas-website-backend.herokuapp.com/data')
      const indexedData = newIndex(response.data.data, wervers)
      const table = indexedData.map(row => {
        return <tr key={uuidv4()}>
          <td className='p-1 border-b-2 border-black' key={uuidv4()}>{row['Nr.']}</td>
          <td className='p-1 border-b-2 border-black' key={uuidv4()}>{row['Naam']}</td>
          <td className='p-1 border-b-2 border-black' key={uuidv4()}>{row['GOB']}</td>
          <td className='p-1 border-b-2 border-black' key={uuidv4()}>{row['TOB']}</td>
          <td className='p-1 border-b-2 border-black' key={uuidv4()}>{row['Werkdagen']}</td>
          <td className='p-1 border-b-2 border-black' key={uuidv4()}>{row['Donateurs']}</td>
          <td className='p-1 border-b-2 border-black' key={uuidv4()}>{row['Bruto donateurs']}</td>
          <td className='p-1 border-b-2 border-black' key={uuidv4()}>{row['GIB']}</td>
          <td className='p-1 border-b-2 border-black' key={uuidv4()}>{row['Uitval']}</td>
        </tr>
      })
      setData(() => table)
    }
    fetchData()
  }, [])

  const newIndex = (data, wervers) => {
    let prev = data[0]
    let newData = [Object.assign({ 'Nr.': 1 }, prev)]
    let i = 2
    for (let werver of data.slice(1, data.length)) {
      console.log(wervers.includes(werver['Naam']))
      if (wervers.includes(werver['Naam'])) {
        let gob = prev['GOB']
        if (werver['GOB'] === gob) {
          newData.push(Object.assign({ 'Nr.': '' }, werver))
        } else {
          newData.push(Object.assign({ 'Nr.': i }, werver))
        }
        prev = werver
        i++
      }
    }
    console.log(newData)
    return newData
  }

  return (
    <>
      <h1 className='text-center mb-3'>{tableName}</h1>
      <table className='w-10/12 bg-slate-100 border-1 border-black rounded-t-md overflow-hidden mb-3 ml-auto mr-auto 
                          transform transition duration-500 shadow-lg hover:scale-[1.025]'>
        <thead >
          <tr className='bg-blue-1000'>
            <th key='index' className='p-1'>Nr.</th>
            <th key='name' className='p-1'>Naam</th>
            <th key='gob' className='p-1'>GOB</th>
            <th key='tob' className='p-1'>TOB</th>
            <th key='dagen' className='p-1'>Werkdagen</th>
            <th key='donateurs' className='p-1'>Donateurs</th>
            <th key='brutodon' className='p-1'>Bruto donateurs</th>
            <th key='gib' className='p-1'>GIB</th>
            <th key='uitval' className='p-1'>Uitval</th>
          </tr>
        </thead>
        <tbody>
          {data ? data : <p>Loading data ...</p>}
        </tbody>
      </table>
    </>
  )
}
