import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">FDA Recall Search</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/druginteractions" className="nav-link">Drug Interactions</Link>
            </li>
            <li className="nav-item">
              <Link to="/druginfo" className="nav-link">Drug Info</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">Recall</Link>
            </li> 
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>          
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;