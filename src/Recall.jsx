import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import RecallInfobox from "./RecallInfoBox";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import DatePicker from "react-datepicker"; // Import the DatePicker component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faSearch,
  faMapLocationDot,
  faHouseMedical,
  faTags,
  faIndustry,
  faRemove,
  faMapPin
} from "@fortawesome/free-solid-svg-icons";

function Recall() {
    // Array of state codes and names
    const states = [
      { code: 'AL', name: 'Alabama' },
      { code: 'AK', name: 'Alaska' },
      { code: 'AZ', name: 'Arizona' },
      { code: 'AR', name: 'Arkansas' },
      { code: 'CA', name: 'California' },
      { code: 'CO', name: 'Colorado' },
      { code: 'CT', name: 'Connecticut' },
      { code: 'DE', name: 'Delaware' },
      { code: 'FL', name: 'Florida' },
      { code: 'GA', name: 'Georgia' },
      { code: 'HI', name: 'Hawaii' },
      { code: 'ID', name: 'Idaho' },
      { code: 'IL', name: 'Illinois' },
      { code: 'IN', name: 'Indiana' },
      { code: 'IA', name: 'Iowa' },
      { code: 'KS', name: 'Kansas' },
      { code: 'KY', name: 'Kentucky' },
      { code: 'LA', name: 'Louisiana' },
      { code: 'ME', name: 'Maine' },
      { code: 'MD', name: 'Maryland' },
      { code: 'MA', name: 'Massachusetts' },
      { code: 'MI', name: 'Michigan' },
      { code: 'MN', name: 'Minnesota' },
      { code: 'MS', name: 'Mississippi' },
      { code: 'MO', name: 'Missouri' },
      { code: 'MT', name: 'Montana' },
      { code: 'NE', name: 'Nebraska' },
      { code: 'NV', name: 'Nevada' },
      { code: 'NH', name: 'New Hampshire' },
      { code: 'NJ', name: 'New Jersey' },
      { code: 'NM', name: 'New Mexico' },
      { code: 'NY', name: 'New York' },
      { code: 'NC', name: 'North Carolina' },
      { code: 'ND', name: 'North Dakota' },
      { code: 'OH', name: 'Ohio' },
      { code: 'OK', name: 'Oklahoma' },
      { code: 'OR', name: 'Oregon' },
      { code: 'PA', name: 'Pennsylvania' },
      { code: 'RI', name: 'Rhode Island' },
      { code: 'SC', name: 'South Carolina' },
      { code: 'SD', name: 'South Dakota' },
      { code: 'TN', name: 'Tennessee' },
      { code: 'TX', name: 'Texas' },
      { code: 'UT', name: 'Utah' },
      { code: 'VT', name: 'Vermont' },
      { code: 'VA', name: 'Virginia' },
      { code: 'WA', name: 'Washington' },
      { code: 'WV', name: 'West Virginia' },
      { code: 'WI', name: 'Wisconsin' },
      { code: 'WY', name: 'Wyoming' },
    ];
  
  // State for the selected state code
  const [selectedState, setSelectedState] = useState('');
  const [drugData, setDrugData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cityName, setCityNameFilter] = useState("");
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null); // Start date
  const [endDate, setEndDate] = useState(null); // End date
  const [genericNameFilter, setGenericNameFilter] = useState("");
  const [brandNameFilter, setBrandNameFilter] = useState("");
  const [manufacturerNameFilter, setManufacturerNameFilter] = useState("");

  const clearFilters = () => {
    // Clear all the filter fields
    setSelectedState('');
    setCityNameFilter("");
    setStartDate(null);
    setEndDate(null);
    setGenericNameFilter("");
    setBrandNameFilter("");
    setManufacturerNameFilter("");
  };

  const handleSearch = () => {
    setLoading(true);
    setError(null);
  
    const api_key = 'eZX8zQSGakyHseSI5stbAIcFqnrTdhFWPgpFeTCM';
    let apiUrl = 'https://api.fda.gov/drug/enforcement.json?search=';
  
    // Create an array to hold filter clauses
    const filterClauses = [];
  
    // Add city filter if it's provided
    if (cityName) {
      filterClauses.push(`city:${cityName}`);
    }

    if (selectedState) {
      filterClauses.push(`state:${selectedState}`);
    }
  
    // Add manufacturer name filter if it's provided
    if (manufacturerNameFilter) {
      filterClauses.push(`openfda.manufacturer_name:${manufacturerNameFilter}`);
    }
  
    // Add generic name filter if it's provided
    if (genericNameFilter) {
      filterClauses.push(`openfda.generic_name:${genericNameFilter}`);
    }
  
    // Add brand name filter if it's provided
    if (brandNameFilter) {
      filterClauses.push(`openfda.brand_name:${brandNameFilter}`);
    }
  
    // Check if there are any filters
    if (filterClauses.length > 0) {
      // Construct the final query by joining filter clauses with 'AND'
      const finalQuery = filterClauses.join(' AND ');
  
      // Append the final query to the API request
      apiUrl += finalQuery;
  
      // Add the date range filter only if other filters are present
      if (startDate && endDate && startDate <= endDate) {
        const formattedStartDate = startDate.toISOString().slice(0, 10).replace(/-/g, '');
        const formattedEndDate = endDate.toISOString().slice(0, 10).replace(/-/g, '');
        const dateRangeQuery = `+AND+report_date:[${formattedStartDate}+TO+${formattedEndDate}]`;
        apiUrl += dateRangeQuery;
      }
    } else {
      // If no filters are applied, add the date range as the initial query
      if (startDate && endDate && startDate <= endDate) {
        const formattedStartDate = startDate.toISOString().slice(0, 10).replace(/-/g, '');
        const formattedEndDate = endDate.toISOString().slice(0, 10).replace(/-/g, '');
        const dateRangeQuery = `report_date:[${formattedStartDate}+TO+${formattedEndDate}]`;
        apiUrl += dateRangeQuery;
      }
    }
  
    // Append additional parameters to the API request
    apiUrl += `&limit=50&api_key=${api_key}`;
  
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
    if (a.status === "Ongoing" && b.status === "Terminated") {
      return -1;
    } else if (a.status === "Terminated" && b.status === "Ongoing") {
      return 1;
    }
    return 0;
  });

  return (
    <div className="background">
      {/* Include the Navbar component here */}
      <Navbar />

      <div className="container col-md-6">
        <h3 className="display-6 pt-3 pb-3">Recall</h3>
        <p className="pt-1 pb-1">
          Search for a drug, and view information about recalls for that drug
        </p>

        <div className="row">
        <div className="col-md-6 mb-3 text-center pt-3">
            <div className="input-group mb-3 align-items-center">
              <div className="input-group-append">
                <span className="input-group-text bg-transparent border-0">
                  <FontAwesomeIcon icon={faMapPin} />
                </span>
              </div>
              <input
                type="text"
                className="form-control rounded p-2"
                placeholder="U.S city"
                value={cityName}
                onChange={(e) => setCityNameFilter(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
          </div>

          <div className="col-md-6 mb-3 text-center pt-3">
      <div className="input-group mb-3 align-items-center">
        <div className="input-group-append">
          <span className="input-group-text bg-transparent border-0">
            <FontAwesomeIcon icon={faMapLocationDot} />
          </span>
        </div>
        <select
          className="form-select rounded p-2"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
    </div>

        <div className="col-md-6 mb-3 text-center pt-3">
            <div className="input-group mb-3 align-items-center">
              <div className="input-group-append">
                <span className="input-group-text bg-transparent border-0">
                  <FontAwesomeIcon icon={faIndustry} />
                </span>
              </div>
              <input
                type="text"
                className="form-control rounded p-2"
                placeholder="Manufacturer Name"
                value={manufacturerNameFilter}
                onChange={(e) => setManufacturerNameFilter(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6 mb-3 text-center pt-3">
            <div className="input-group mb-3 align-items-center">
              <div className="input-group-append">
                <span className="input-group-text bg-transparent border-0">
                  <FontAwesomeIcon icon={faHouseMedical} />
                </span>
              </div>
              <input
                type="text"
                className="form-control rounded p-2"
                placeholder="Generic Name"
                value={genericNameFilter}
                onChange={(e) => setGenericNameFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-12 mb-3 text-center pt-3">
            <div className="input-group mb-3 align-items-center">
              <div className="input-group-append">
                <span className="input-group-text bg-transparent border-0">
                  <FontAwesomeIcon icon={faTags} />
                </span>
              </div>
              <input
                type="text"
                className="form-control rounded p-2"
                placeholder="Brand Name"
                value={brandNameFilter}
                onChange={(e) => setBrandNameFilter(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6 mb-3 text-center">
            <FontAwesomeIcon className="padding" icon={faCalendarAlt} />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="form-control rounded p-2"
            />
          </div>
          <div className="col-md-6 mb-3 text-center">
            <FontAwesomeIcon className="padding" icon={faCalendarAlt} />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="End Date"
              className="form-control rounded p-2"
            />
          </div>

          <div className="col-md-6 mb-3 text-center pt-3">
          <button
              className="primarygreen btn searchbtn"
              onClick={handleSearch}
            >
              <FontAwesomeIcon
                icon={faSearch}
                style={{ color: "white", marginRight: "5px" }}
              />
              Search
            </button>
            </div>

        <div className="col-md-6 mb-3 text-center pt-3">
          <button
              className="primarygreen btn searchbtn"
              onClick={clearFilters}
            >
              <FontAwesomeIcon
                icon={faRemove}
                style={{ color: "white", marginRight: "5px" }}
              />
              Clear Filters
            </button>
            </div>
            </div>

        {error ? (
          <div className="d-flex justify-content-center">
          <p>There was an error loading the data. Please try another search</p>
          </div>
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
