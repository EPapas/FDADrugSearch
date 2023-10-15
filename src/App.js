import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Infobox from './Infobox';

function App() {
  const [drugData, setDrugData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  const handleSearch = () => {
    setLoading(true);

    const api_key = 'eZX8zQSGakyHseSI5stbAIcFqnrTdhFWPgpFeTCM';
    const apiUrl = `https://api.fda.gov/drug/label.json?search=${searchQuery}&api_key=${api_key}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setDrugData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // This effect will run when the component mounts
    // You can perform any initial API call here if needed.
  }, []);

  return (
    <div className="container">
       <h1 className="display-4 pt-4 pb-4">FDA Drug Search Tool</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a drug name (ex: aspirin)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : drugData ? (
        <ul>
          {drugData.results.map(item => (
            <li key={item.openfdaid}>
              Effect: {item.openfda.generic_name} - {item.openfda.brand_name} count
              {item.dosage_and_administration}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default App;