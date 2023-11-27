import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

function About() {
  return (
    <div className="background">
    <Navbar />
    <div className="container col-md-6">
    <h3 className="display-6 pt-3 pb-3">About this Site</h3>
    <p>Welcome to our Drug Search website, a school project created for educational purposes. This website is designed to provide information about drug recalls using data from the OpenFDA APIs.</p>

    <h3 className="display-6 pt-3 pb-3">What is OpenFDA?</h3>
    <p>OpenFDA is an initiative by the U.S. Food and Drug Administration (FDA) to provide easy access to the vast amount of publicly available FDA data. The OpenFDA APIs offer a wealth of information about drugs, medical devices, and food products.</p>

    <h3 className="display-6 pt-3 pb-3">Purpose</h3>
    <p>This website serves as a platform for exploring and understanding drug recalls, which are actions taken by a firm to remove a product from the market. Additionally, we provide a search for basic information on drugs and drug interaction search. However, please note that this website is for educational purposes only and is not meant to be used to diagnose or treat any medical conditions.</p>

    <h3 className="display-6 pt-3 pb-3">Explore Drug Recalls</h3>
    <p>With our user-friendly interface, you can search for drug recalls based on location and date range. Use the search bar and date pickers to access the information you need. We aim to make the process of exploring drug recalls more accessible and understandable.</p>

    </div>
    </div>
  );
}

export default About;