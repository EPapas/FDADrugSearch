import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

function About() {
  return (
    <div>
    <Navbar />
    <div>
      <h2>About Us</h2>
      <p>This is the About page content.</p>
    </div>
    </div>
  );
}

export default About;