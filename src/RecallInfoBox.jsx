import React from 'react';
import './App.css';
import Expander from './Expander';

function formatDateFromApi(dateString) {
  // Check if the input date string is valid
  if (dateString && dateString.length === 8) {
    // Extract year, month, and day components
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    // Format the date as "mm/dd/yyyy"
    return `${month}/${day}/${year}`;
  } else {
    // Handle invalid date string or return the original value
    return dateString;
  }
}

function RecallInfobox({ data }) {
  return (
    <div className="border rounded md-col-6 infobox">
    <div className={`${
  data.status === 'Ongoing' ? 'primaryorange' : data.status === 'Terminated' ? 'primaryblue' : 'primarygreen'
} p-3 rounded-top text-center`}>
  <p className="mb-0 custom-larger-text labeltext">
    {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
  </p>
</div>

{data.openfda.brand_name && (
        <div className=" p-3">
          <Expander content={data.openfda.brand_name} label={'Brand Name'} maxLength={200} />
        </div>
      )}

{data.openfda.generic_name && (
        <div className="border-top p-3">
          <Expander content={data.openfda.generic_name} label={'Generic Name'} maxLength={200} />
        </div>
      )}

{data.openfda.manufacturer_name && (
        <div className="border-top p-3">
          <Expander content={data.openfda.manufacturer_name} label={'Manufacturer Name'} maxLength={200} />
        </div>
      )}

            {/* Add rows for the new responses if they don't already exist */}
            {data.status && (
        <div className="border-top p-3">
          <Expander content={data.product_description} label={'Description'} maxLength={200} />
        </div>
      )}

      {data.reason_for_recall && (
        <div className=" border-top p-3">
          <Expander content={data.reason_for_recall} label={'Reason for Recall'} maxLength={200} />
        </div>
      )}

      {data.product_quantity && (
        <div className="border-top p-3">
          <Expander content={data.product_quantity} label={'Product Quantity'} maxLength={200} />
        </div>
      )}

      {data.recall_initiation_date && (
        <div className="border-top p-3">
          <Expander content={formatDateFromApi(data.recall_initiation_date)} label={'Recall Initiation Date'} maxLength={200} />
        </div>
     ) }

      {data.termination_date && (
        <div className="border-top p-3">
          <Expander content={formatDateFromApi(data.termination_date)} label={'Termination Date'} maxLength={200} />
        </div>
      )}

      {data.city && (
        <div className="border-top p-3">
          <Expander content={data.city} label={'City'} maxLength={200} />
        </div>
      )}

      {data.state && (
        <div className="border-top p-3">
          <Expander content={data.state} label={'State'} maxLength={200} />
        </div>
      )}

      {data.country && (
        <div className="border-top p-3">
          <Expander content={data.country} label={'Country'} maxLength={200} />
        </div>
      )}

      {data.classification && (
        <div className="border-top p-3">
          <Expander content={data.classification} label={'Classification'} maxLength={200} />
        </div>
      )}

      {data.product_type && (
        <div className="border-top p-3">
          <Expander content={data.product_type} label={'Product Type'} maxLength={200} />
        </div>
      )}

      {data.recalling_firm && (
        <div className="border-top p-3">
          <Expander content={data.recalling_firm} label={'Recalling Firm'} maxLength={200} />
        </div>
      )}

      {data.voluntary_mandated && (
        <div className="border-top p-3">
          <Expander content={data.voluntary_mandated} label={'Voluntary/Mandated'} maxLength={200} />
        </div>
      )}

      {data.distribution_pattern && (
        <div className="border-top p-3">
          <Expander content={data.distribution_pattern} label={'Distribution Pattern'} maxLength={200} />
        </div>
      )}

    </div>
  );
}

export default RecallInfobox;
