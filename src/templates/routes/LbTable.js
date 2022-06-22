import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

export default function LbTable({ names, tableName }) {
    const { isLoading, error, data } = useQuery('werverData', async () => {
        return axios.get('https://atlas-website-backend.herokuapp.com/scrape-data')
    })

    const tableRows = (rowData) => {
        return rowData.map((werver, index) => {
            const rowColor = index % 2 === 0 ? 'bg-white' : ''
            return <tr key={index} className={rowColor}>
                <td className='border-r-2'>{index + 1}</td>
                <td>{werver['Naam']}</td>
                <td>{werver['TOB']}</td>
                <td>{werver['GOB']}</td>
                <td>{werver['Werkdagen']}</td>
                <td>{werver['Donateurs']}</td>
                <td>{werver['Bruto donateurs']}</td>
                <td>{werver['GIB']}</td>
                <td>{werver['Uitval']}</td>
            </tr>
        })
    }

    if (isLoading) {
        return (
            <p>Fetching data ...</p>
        )
    }

    return (
        <div className='mx-auto'>
            <h1 className='text-center'>{tableName}</h1>
            <table className='bg-slate-100 table-fixed border-2 border-black'>
                <thead>
                    <tr className='bg-blue-1000 border-b-2 border-black'>
                        <th className='w-min-content border-r-2'>Nr.</th>
                        <th className='w-min-content'>Naam</th>
                        <th className='w-min-content'>TOB</th>
                        <th className='w-min-content'>GOB</th>
                        <th className='w-min-content'>Werkdagen</th>
                        <th className='w-min-content'>Donateurs</th>
                        <th className='w-min-content'>Bruto donateurs</th>
                        <th className='w-min-content'>GIB</th>
                        <th className='w-min-content'>Uitval</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows(data.data.data)}
                </tbody>
            </table>
        </div>
    )
}
