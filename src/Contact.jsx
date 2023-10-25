import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

function Contact() {
  return (
    <div>
    <Navbar />
    <div>
      <h2>Contact Us</h2>
      <p>This is the Contact page content.</p>
    </div>
    </div>
  );
}

export default Contact;