import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


import './navbar.css'

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Top Music</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav className="me-auto">
              <Nav.Link className="nav-link" href="/">Home</Nav.Link>
              <Nav.Link className="nav-link" href="/top10Songs">
                <FontAwesomeIcon icon={faFire} /> <span> </span>
                Top 10 Songs
              </Nav.Link>
              <Nav.Link className="nav-link" href="/top10Artists">
                <FontAwesomeIcon icon={faFire} /> <span> </span>
                Top 10 Artists
              </Nav.Link>
              <Nav.Link className="nav-link" href="/allSongs">All Songs</Nav.Link>
            </Nav>
            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 searchbar"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
