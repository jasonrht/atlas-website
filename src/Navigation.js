import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import atlasLogo from './atlas-logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';


export default function Navigation(props) {
    const handleLogout = () => {
        localStorage.setItem('token', null)
    }
    const loginStatus = props.status
    console.log(`@Navigation.js: ${loginStatus}`)
    return (
        <Navbar className="w-screen md:justify-start border-y-2 border-black mb-6" bg="background-blue" expand="sm">
            <Navbar.Brand href="/" className='-ml-4 md:border-r-2 p-8 border-black'>
                <img src={atlasLogo}
                    width="150"
                    height="40"
                    alt="Atlas Logo missing"
                />
            </Navbar.Brand>
            {loginStatus &&
                <NavbarToggle className='mr-4 dark border-black border-2 text-white'></NavbarToggle>}
            <Navbar.Collapse id="basic-navbar-nav" className=''>
                <Nav className="me-auto mt-4 border-t-2 md:border-0 border-black">
                    {/* <Nav.Link className="nav-link ml-2 md:hover:-translate-y-1" href="/leaderboards"><p className='text-black'>Leaderboards</p></Nav.Link> */}
                    {/* <Nav.Link className='nav-link ml-2 md:hover:-translate-y-1' href='/wervers'><p className='text-black'>Wervers</p></Nav.Link> */}
                    {/* <Nav.Link className='nav-link ml-2' href='/register'><p className='text-black transform translate duration-[400ms] md:hover:-translate-y-1'>Nieuwe gebruikers</p></Nav.Link> */}
                    {loginStatus &&
                        <>
                            <Nav.Link className='nav-link ml-2' href='/'>
                                <p className='text-black transform translate duration-[100ms] md:hover:-translate-y-1'>Home</p>
                            </Nav.Link>
                            <Nav.Link className='nav-link ml-2' href='/leaderboards'>
                                <p className='text-black transform translate duration-[100ms] md:hover:-translate-y-1'>Leaderboards</p>
                            </Nav.Link>
                            <Nav.Link className='nav-link ml-2' href='/pas-aanvraag'>
                                <p className='text-black transform translate duration-[100ms] md:hover:-translate-y-1'>Pas aanvragen</p>
                            </Nav.Link>
                        </>}
                </Nav>
                <Nav>
                    {loginStatus &&
                        <Nav.Link className='nav-link ml-2 mr-8 mt-4' href='/login' onClick={handleLogout}>
                            <p className='text-black transform translate duration-[100ms] md:hover:-translate-y-1'>Uitloggen</p>
                        </Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
