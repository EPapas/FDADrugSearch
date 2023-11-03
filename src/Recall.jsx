import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import RecallInfobox from './RecallInfoBox';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCoffee } from '@fortawesome/free-solid-svg-icons';

function Recall() {
  const [drugData, setDrugData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null); // Start date
  const [endDate, setEndDate] = useState(null); // End date

  const handleSearch = () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    const api_key = 'eZX8zQSGakyHseSI5stbAIcFqnrTdhFWPgpFeTCM';
    // const apiUrl = `https://api.fda.gov/drug/label.json?search=${searchQuery}&api_key=${api_key}`;
    const apiUrl = `https://api.fda.gov/drug/enforcement.json?search=city:${searchQuery}&limit=50&api_key=${api_key}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDrugData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // This effect will run when the component mounts
    // You can perform any initial API call here if needed.
  }, []);

  // Sort the results array by status, 'Ongoing' first, then 'Terminated'
  const sortedResults = drugData?.results.sort((a, b) => {
    if (a.status === 'Ongoing' && b.status === 'Terminated') {
      return -1;
    } else if (a.status === 'Terminated' && b.status === 'Ongoing') {
      return 1;
    }
    return 0;
  });

  return (
    <div>
      {/* Include the Navbar component here */}
      <Navbar />

      <div className="container col-md-6">
        <h3 className="display-6 pt-3 pb-3">Recall</h3>
        <p className="pt-1 pb-1">Search for a drug, and view information about recalls for that drug</p>
        <div className="input-group mb-3 pt-4 pb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a city in the United States (ex: Albany)"
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

        <div className="row">
  <div className="col-md-6 mb-3">
  <FontAwesomeIcon className='padding' icon={faCalendarAlt} /> 
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      placeholderText="Select Start Date"
      className="form-control rounded p-2"
    />
  </div>
  <div className="col-md-6 mb-3">
  <FontAwesomeIcon className='padding' icon={faCalendarAlt} /> 
    <DatePicker
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      placeholderText="Select End Date"
      className="form-control rounded p-2"
    />
  </div>
</div>

        {error ? (
          <p>There was an error loading the data. Please try another search</p>
        ) : loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-dark" role="status"></div>
          </div>
        ) : sortedResults ? (
          sortedResults.map((item, index) => (
            <RecallInfobox data={item} key={index} />
          ))
        ) : null}
      </div>
    </div>
  );
}

export default Recall;
