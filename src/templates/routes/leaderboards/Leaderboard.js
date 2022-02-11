import React from 'react'

export default function Leaderboard(props) {
    const allData = props.data;
    const name = props.name;
    const sp = ["Abdi Ali","Arjan Noordermeer","Britt Gruntjes","Camille Montoux","Carl Hendriks",
    "Eefje Groot Koerkamp","Geneau Bodden","Mathis Montoux","Moos Minkes","Owen Maas",
    "Rick Kerkhoven","Sander Boesten","Ted Hulshof","Thijs Bakker","Tim Chibanov",
    "Wijnand Hoofs","Willemijn Renzen","Wouter Wissema","Yannick O'Callaghan","Max Scholsberg",
    "Ismael El Hamouchi","Jethro Swennen","Ferry Biesheuvel","Luke Hermes","Jelle van Eck","Luc van der Vorm"]
    const st = ["Boris Ruijtenbeek","Brett Taument","David Migo","Giovanni Melissant",
    "Joep Koolen", "Luuc Marchand","Quentin Booi"]
    const promotors = ["Oscar Martinez","Rosa de Kiefte","Simon Knotnerus"]
    const columnNames = ['Nr.','Naam','TOB','GOB','Werkdagen','Donateurs','Bruto Donateurs','GIB','Uitval']
    const columns = columnNames.map(col => <th key={col} className='p-1'>{col}</th>)
    console.log(allData)
    if(name === 'algemeen') {
        console.log('type set to "algemeen"')
        let spData = []
        let stData = []
        let promotorData = []
        allData.forEach(werver => {
            if(sp.includes(werver[1])) {
                spData.push(werver) 
            }
            else if(st.includes(werver[1])) {
                stData.push(werver)
            }
            else if(promotors.includes(werver[1])){
                promotorData.push(werver)
            }
        })        
        let prevTOB = spData[0][2]
        spData[0][0] = 1
        for(let i=1;i<spData.length;i++) {
            if (spData[i][2] === prevTOB){
                spData[i][0] = '';
            }
            else {
                spData[i][0] = i+1;
            }
            prevTOB = spData[i][2]
        }
       
        prevTOB = stData[0][2]
        stData[0][0] = 1
        for(let i=1;i<stData.length;i++) {
            if (stData[i][2] === prevTOB){
                stData[i][0] = '';
            }
            else {
                stData[i][0] = i+1;
            }
            prevTOB = stData[i][2]
        }
       
        prevTOB = promotorData[0][2]
        promotorData[0][0] = 1
        for(let i=1;i<promotorData.length;i++) {
            if (promotorData[i][2] === prevTOB){
                promotorData[i][0] = '';
            }
            else {
                promotorData[i][0] = i+1;
            }
            prevTOB = promotorData[i][2]
        }
        console.log(allData)


        const rowsSP = spData.map(function (tr) {
            return <tr key={tr}>{tr.map((td, indexKey) => <td className='p-1 border-b-2 border-black' key={indexKey}>{td}</td>)}</tr>
        })

        const rowsPromotors = promotorData.map(function (tr) {
            if(parseFloat(tr[3].replace('€ ','').replace(',','.')) >= 40) {
                return <tr className={`bg-green-400`} key={tr}>{tr.map((td, indexKey) => <td className='p-1 border-b-2 border-black' key={indexKey}>{td}</td>)}</tr>
            }   
            return <tr key={tr}>{tr.map((td, indexKey) => <td className='p-1 border-b-2 border-black' key={indexKey}>{td}</td>)}</tr> 
        })

        const rowsST = stData.map(function (tr) {
            if(parseFloat(tr[3].replace('€ ','').replace(',','.')) >= 40) {
                return <tr className={`bg-green-400`} key={tr}>{tr.map((td, indexKey) => <td className='p-1 border-b-2 border-black' key={indexKey}>{td}</td>)}</tr>
            }   
            return <tr key={tr}>{tr.map((td, indexKey) => <td className='p-1 border-b-2 border-black' key={indexKey}>{td}</td>)}</tr> 
        })

        return (
            <>
            {/* <LbTable data={spData} name={'Sales Professionals+'} /> */}
            <div className='w-11/12'>
                <h1>Sales Professionals+</h1>
                <table className='bg-slate-100 border-1 border-black rounded-t-md overflow-hidden mb-3'>
                    <thead>
                        <tr className='bg-blue-1000'>{columns}</tr>
                    </thead>
                    <tbody>
                        {rowsSP}
                    </tbody>
                </table>
                <h1>Promotors</h1>
                <table className='bg-slate-100 border-1 border-black rounded-t-md overflow-hidden mb-3'>
                    <thead>
                        <tr className='bg-blue-1000'>{columns}</tr>
                    </thead>
                    <tbody>
                        {rowsPromotors}
                    </tbody>
                </table>
                <h1>Shark Tank</h1>
                <table className='bg-slate-100 border-1 border-black rounded-t-md overflow-hidden mb-3'>
                    <thead className='bg-blue-1000'>
                        <tr>{columns}</tr>
                    </thead>
                    <tbody>
                        {rowsST}
                    </tbody>
                </table>
            </div>
            </>
        )
    }
    else if(name === 'apex') {
        console.log('type set to "apex"')
        const apexWervers = ['Britt Gruntjes','Ismael El Hamouchi','Camille Montoux',
                            'Jethro Swennen','Max Scholsberg',"Yannick O'Callaghan"]
        const apexData = []
        allData.forEach(werver => {
            if(apexWervers.includes(werver[1])) {
                apexData.push(werver) 
            }
        })
        let prevTOB = apexData[0][2]
        apexData[0][0] = 1
        for(let i=1;i<apexData.length;i++) {
            if (apexData[i][2] === prevTOB){
                apexData[i][0] = '';
            }
            else {
                apexData[i][0] = i+1;
            }
            prevTOB = apexData[i][2]
        }
        console.log(apexData)

        const rowsApex = apexData.map(function (tr) {  
            return <tr key={tr}>{tr.map((td, indexKey) => <td className='p-1 border-b-2 border-black' key={indexKey}>{td}</td>)}</tr> 
        })

        return (
            <>
            <h1>Apex</h1>
            <table className='bg-slate-100 border-1 border-black rounded-t-md overflow-hidden'>
                <thead>
                    <tr className='bg-blue-1000'>{columns}</tr>
                </thead>
                <tbody>
                    {rowsApex}
                </tbody>
            </table>
            </>
        )
    } 
    else if(name === 'nino') {
        console.log('type set to "nino"')
        const papyrusWervers = ['Jelle van Eck',"Yannick O'Callaghan",'Oscar Martinez','Boris Ruijtenbeek','Arjan Noordermeer']
        const papyrusData = []
        allData.forEach(werver => {
            if(papyrusWervers.includes(werver[1])) {
                papyrusData.push(werver) 
            }
        })
        let prevTOB = papyrusData[0][2]
        papyrusData[0][0] = 1
        for(let i=1;i<papyrusData.length;i++) {
            if (papyrusData[i][2] === prevTOB){
                papyrusData[i][0] = '';
            }
            else {
                papyrusData[i][0] = i+1;
            }
            prevTOB = papyrusData[0][2]
        }
        console.log(papyrusData)
        const rowsNino = papyrusData.map(function (tr) {
            return <tr key={tr}>{tr.map((td, indexKey) => <td className='p-1 border-b-2 border-black' key={indexKey}>{td}</td>)}</tr> 
        })
        return (
            <>
            <h1>Nino's Poule</h1>
            <table className='bg-slate-100 border-1 border-black rounded-t-md overflow-hidden'>
                <thead>
                    <tr className='bg-blue-1000'>{columns}</tr>
                </thead>
                <tbody>
                    {rowsNino}
                </tbody>
            </table>
            </>
        )
    }
    else if(name === 'jethro') {
        console.log('type set to "jethro"')
        const jethroWervers = ['Rosa de Kiefte','Wijnand Hoofs','Owen Maas','David Migo','Simon Knotnerus','Jethro Swennen','Luc van der Vorm']
        const jethroData = []
        allData.forEach(werver => {
            if(jethroWervers.includes(werver[1])) {
                jethroData.push(werver) 
            }
        })
        let prevTOB = jethroData[0][2]
        jethroData[0][0] = 1
        for(let i=1;i<jethroData.length;i++) {
            if (jethroData[i][2] === prevTOB){
                jethroData[i][0] = '';
            }
            else {
                jethroData[i][0] = i+1;
            }
            prevTOB = jethroData[0][2]
        }
        console.log(jethroData)

        const rowsJethro = jethroData.map(function (tr) { 
            return <tr key={tr}>{tr.map((td, indexKey) => <td className='p-1 border-b-2 border-black' key={indexKey}>{td}</td>)}</tr> 
        })
        return (
            <>
            <h1>Jethro's Poule</h1>
            <table className='bg-slate-100 border-1 border-black rounded-t-md overflow-hidden'>
                <thead>
                    <tr className='bg-blue-1000'>{columns}</tr>
                </thead>
                <tbody>
                    {rowsJethro}
                </tbody>
            </table>
            </>
        )
    }
    else if(name === 'hermes') {
        console.log('type set to "hermes"')
        const hermesWervers = ['Brett Taument','Quentin Booi','Luke Hermes','Luux Marchand','Ian Hermes']
        const hermesData = []
        allData.forEach(werver => {
            if(hermesWervers.includes(werver[1])) {
                hermesData.push(werver) 
            }
        })
        let prevTOB = hermesData[0][2]
        hermesData[0][0] = 1
        for(let i=1;i<hermesData.length;i++) {
            if (hermesData[i][2] === prevTOB){
                hermesData[i][0] = '';
            }
            else {
                hermesData[i][0] = i+1;
            }
            prevTOB = hermesData[0][2]
        }
        console.log(hermesData)

        const rowsHermes = hermesData.map(function (tr) {
            return <tr key={tr}>{tr.map((td, indexKey) => <td className='p-1 border-b-2 border-black' key={indexKey}>{td}</td>)}</tr> 
        })

        return (
            <>
            <h1>Hermes Poule</h1>
            <table className='bg-slate-100 border-1 border-black rounded-t-md overflow-hidden'>
                <thead>
                    <tr className='bg-blue-1000'>{columns}</tr>
                </thead>
                <tbody>
                    {rowsHermes}
                </tbody>
            </table>
            </>
        )
    }
    else if(name === 'ismael') {
        console.log('type set to "ismael"')
        const ismaelWervers = ['Ismael El Hamouchi','Willemijn Renzen']
        const ismaelData = []
        allData.forEach(werver => {
            if(ismaelWervers.includes(werver[1])) {
                ismaelData.push(werver) 
            }
        })
        let prevTOB = ismaelData[0][2]
        ismaelData[0][0] = 1
        for(let i=1;i<ismaelData.length;i++) {
            if (ismaelData[i][2] === prevTOB){
                ismaelData[i][0] = '';
            }
            else {
                ismaelData[i][0] = i+1;
            }
            prevTOB = ismaelData[0][2]
        }
        console.log(ismaelData)

        const rowsIsmael = ismaelData.map(function (tr) {
            return <tr key={tr}>{tr.map((td, indexKey) => <td className='p-1 border-b-2 border-black' key={indexKey}>{td}</td>)}</tr> 
        })

        return (
            <>
            <h1>Ismael's Poule</h1>
            <table className='bg-slate-100 border-1 border-black rounded-t-md overflow-hidden'>
                <thead>
                    <tr className='bg-blue-1000'>{columns}</tr>
                </thead>
                <tbody>
                    {rowsIsmael}
                </tbody>
            </table>
            </>
        )
    }
}
