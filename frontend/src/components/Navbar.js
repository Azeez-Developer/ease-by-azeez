// src/components/Navbar.js
import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const AppNavbar = ({ user }) => {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      className="shadow-sm fixed-top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
          Ease by Azeez
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" onClick={handleNavClick}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/books" onClick={handleNavClick}>
              Books
            </Nav.Link>
            <Nav.Link as={NavLink} to="/donate" onClick={handleNavClick}>
              Donate
            </Nav.Link>

            {user?.role === 'admin' && (
              <Nav.Link as={NavLink} to="/dashboard" onClick={handleNavClick}>
                Dashboard
              </Nav.Link>
            )}

            <Nav.Link as={NavLink} to="/login" onClick={handleNavClick}>
              Login/Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
