import React from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function LbTable(props) {
    const data = props.data
    const tableName = props.name

    console.log(data)

    const columnNames = ['Nr.','Naam','TOB','GOB','Werkdagen','Donateurs','Bruto Donateurs','GIB','Uitval']
    const columns = columnNames.map(col => <th key={uuidv4()} className='p-1'>{col}</th>)

    // const tables = [] 
    // for(const [key,value] of Object.entries(data)){
    //     tables.push(value.data.map(row => <tr key={uuidv4()} className='p-1 border-b-2 border-black'>{row.map(td => <td key={uuidv4()}>{td}</td>)}</tr>))
    // }

    const table = data.map(row => <tr key={uuidv4()} className='p-1 border-b-2 border-black'>{row.map(td => <td key={uuidv4()}>{td}</td>)}</tr>)

    return (
        <div className='ml-3'>
            <h1>{tableName}</h1>
                <table className='bg-slate-100 border-1 border-black overflow-hidden rounded-md'>
                    <thead>
                        <tr className='bg-blue-1000'>
                            {columns}
                        </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </table>
        </div>
    )
}
