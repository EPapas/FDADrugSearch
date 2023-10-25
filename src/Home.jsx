import React, { useState, useEffect } from 'react';
import Infobox from './Infobox';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

function Home() {
    const [drugData, setDrugData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
  
    const handleSearch = () => {
      setLoading(true);
      setError(null); // Clear any previous errors
  
      const api_key = 'eZX8zQSGakyHseSI5stbAIcFqnrTdhFWPgpFeTCM';
      //const apiUrl = `https://api.fda.gov/drug/label.json?search=${searchQuery}&api_key=${api_key}`;
      const apiUrl = `https://api.fda.gov/drug/label.json?search=drug_interactions:${searchQuery}&limit=15&api_key=${api_key}`;
  
      fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setDrugData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  };
  
    useEffect(() => {
      // This effect will run when the component mounts
      // You can perform any initial API call here if needed.
    }, []);
  
    return (
        <div>
          {/* Include the Navbar component here */}
          <Navbar />
          
          <div className="container col-md-6">
            <h2 className="display-4 pt-4 pb-4">Drug Interactions</h2>
            <p className="pt-1 pb-1">Search for a drug (ex: caffeine, alcohol) and the search results will show different drugs that interact with it</p>
            <div className="input-group mb-3 pt-4 pb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search for a drug name (ex: aspirin)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="primarygreen btn searchbtn"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
    
            {error ? (
              <p>There was an error loading the data. Please try another search</p>
            ) : loading ? (
              <p>Loading...</p>
            ) : drugData ? (
              drugData.results.map(item => (
                <Infobox data={item} />
              ))
            ) : null}
          </div>
        </div>
      );
    }
export default Home;