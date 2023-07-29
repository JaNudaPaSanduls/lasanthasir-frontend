import React from 'react';
import './navbar.css';
import logo from '../../images/logo.png';

const NavBar = () => {
  return (
    <div className="content">
        <img className="logo" onClick={() => window.location = "/"} src={logo} alt="logo" />
    </div>
  )
}

export default NavBar