// src/App.js
import React from 'react';
import HomePage from './pages/HomePage';
import AppNavbar from './components/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <>
      <AppNavbar />
      <HomePage />
    </>
  );
}

export default App;
