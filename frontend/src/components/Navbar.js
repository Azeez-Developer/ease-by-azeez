// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const AppNavbar = ({ user }) => {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm fixed-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
          Ease by Azeez
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            {/* <Nav.Link as={NavLink} to="/about">About</Nav.Link> */}
            <Nav.Link as={NavLink} to="/books">Books</Nav.Link>
            <Nav.Link as={NavLink} to="/donate">Donate</Nav.Link>

            {user?.role === 'admin' && (
              <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
            )}

            <Nav.Link as={NavLink} to="/login">Login/Register</Nav.Link>
            {/* <Nav.Link as={NavLink} to="/register">Register</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
