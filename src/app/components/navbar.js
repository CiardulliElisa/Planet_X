'use client'

import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './styles.css';

export default function NavBar({ room }) {
  return (
    <div style={{ paddingBottom: '5vw' }}>
      <Navbar fixed='top' variant='dark' collapseOnSelect expand="sm" className="bg-body-tertiary justify-content-center custom-navbar">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='m-auto'>
              <Nav.Link className="mx-3" href={`/game/${room}/board`}>Board</Nav.Link>
              <Nav.Link className="mx-3" href={`/game/${room}/research`}>Researches</Nav.Link>
              <NavDropdown className="mx-3" title="Actions" id="collapsible-nav-dropdown">
                <NavDropdown.Item href={`/game/${room}/actions/survey`}>Survey</NavDropdown.Item>
                <NavDropdown.Item href={`/game/${room}/actions/research`}>
                  Research
                </NavDropdown.Item>
                <NavDropdown.Item href={`/game/${room}/actions/target`}>Target</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={`/game/${room}/actions/planetX
              `}>
                  Planet X
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}