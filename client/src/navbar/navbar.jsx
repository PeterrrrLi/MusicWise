import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import './navbar.css'

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">HipHopHierarchy</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav className="me-auto">
              <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/top10Songs">
                <FontAwesomeIcon icon={faFire} /> <span> </span>
                Top 10 Songs
              </Nav.Link>
              <Nav.Link as={NavLink} to="/top10Artists">
                <FontAwesomeIcon icon={faFire} /> <span> </span>
                Top 10 Artists
              </Nav.Link>
              <Nav.Link className="nav-link" href="/allSongs">All Songs</Nav.Link>
            </Nav>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
