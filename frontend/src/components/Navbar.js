// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css'; 

const AppNavbar = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm fixed-top">
  <Container>
    <Navbar.Brand href="/" className="fw-bold fs-4">Ease by Azeez</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ms-auto"> {/* 👈 pushes links to the right */}
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/books">Browse</Nav.Link>
        <Nav.Link href="/donate">Donate</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};

export default AppNavbar;
