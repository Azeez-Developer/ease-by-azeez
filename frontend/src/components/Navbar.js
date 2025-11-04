// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const AppNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔄 Watch for route changes or login/logout updates
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]); // reruns whenever route changes

  const handleNavClick = () => setExpanded(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setExpanded(false);
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user'));

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
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" onClick={handleNavClick}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/books" onClick={handleNavClick}>
              Books
            </Nav.Link>
            <Nav.Link as={NavLink} to="/donate" onClick={handleNavClick}>
              Donate
            </Nav.Link>

            {/* Dashboard only for admin */}
            {user?.role === 'admin' && (
            <Nav.Link as={NavLink} to="/admin/dashboard" onClick={handleNavClick}>
              Dashboard
            </Nav.Link>
            )}


            {!isLoggedIn ? (
              <Nav.Link as={NavLink} to="/login" onClick={handleNavClick}>
                Login/Register
              </Nav.Link>
            ) : (
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
