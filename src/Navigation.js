import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import atlasLogo from './atlas-logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Navigation(props) {
    const handleLogout = () => {
        localStorage.setItem('token', null)
    }
    const loginStatus = props.status
    console.log(`@Navigation.js: ${loginStatus}`)
    return (
        <Navbar className="justify-start" bg="background-blue" expand="sm">
            <Navbar.Brand href="#home">
                <img src={atlasLogo}
                    width="150"
                    height="40"
                    alt="Atlas Logo missing"
                />
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className="nav-link" href="/leaderboards">Leaderboards</Nav.Link>
                    <Nav.Link className='nav-link' href='/wervers'>Wervers</Nav.Link>
                    <Nav.Link className='nav-link' href='/pas-aanvraag'>Pas aanvragen</Nav.Link>
                    {loginStatus && <Nav.Link className='nav-link' href='/login' onClick={handleLogout}>Logout</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
