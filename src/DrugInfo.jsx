import React, { useState, useEffect } from 'react';
import Infobox from './Infobox';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

function DrugInfo() {
    const [drugData, setDrugData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
  
    const handleSearch = () => {
      setLoading(true);
      setError(null); // Clear any previous errors
  
      const api_key = 'eZX8zQSGakyHseSI5stbAIcFqnrTdhFWPgpFeTCM';
      //const apiUrl = `https://api.fda.gov/drug/label.json?search=${searchQuery}&api_key=${api_key}`;
      const apiUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchQuery}&limit=50&api_key=${api_key}`;
  
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
            <h3 className="display-6 pt-3 pb-3">Drug Info</h3>
            <p className="pt-1 pb-1">Search for a drug, and view information about the searched item.</p>
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
                <div className="d-flex justify-content-center">
    <div className="spinner-border text-dark" role="status">
    </div>
  </div>
            ) : drugData ? (
                drugData.results
    .filter((item) => item.openfda && item.openfda.brand_name) // Filter out items without openfda or brand_name
    .reduce((uniqueResults, item) => {
      if (!uniqueResults.brands.has(item.openfda.brand_name[0])) {
        uniqueResults.brands.add(item.openfda.brand_name[0]);
        uniqueResults.items.push(item);
      }
      return uniqueResults;
    }, { brands: new Set(), items: [] })
    .items.map((item, index) => <Infobox data={item} key={index} />) // Include only the unique items
) : null}
          </div>
        </div>
      );
    }
export default DrugInfo;