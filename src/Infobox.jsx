import React from 'react';
import './App.css'
import Expander from './Expander';

function Infobox({ data }) {
  const {
    openfda,
  } = data;

  return (
    <div className="border rounded md-col-6 infobox">
      <div className="primarygreen p-3 rounded-top text-center">
      <p className="mb-0 custom-larger-text labeltext">{openfda.brand_name}</p>
      </div>
      {data.dosage_and_administration !== null && String(data.dosage_and_administration) !== "undefined" && (
  <div className="p-3">
    <Expander content={String(data.dosage_and_administration)} label={'Description'} maxLength={200} />
  </div>
)}

{data.indications_and_usage !== null && String(data.indications_and_usage) !== "undefined" && (
  <div className="border-top p-3">
    <Expander content={String(data.indications_and_usage)} label={'Usage'} maxLength={200} />
  </div>
)}

{data.dosage_forms_and_strengths !== null && String(data.dosage_forms_and_strengths) !== "undefined" && (
  <div className="border-top p-3">
    <Expander content={String(data.dosage_forms_and_strengths)} label={'Dosage Forms and Strengths'} maxLength={200} />
  </div>
)}

{data.storage_and_handling !== null && String(data.storage_and_handling) !== "undefined" && (
  <div className="border-top p-3">
    <Expander content={String(data.storage_and_handling)} label={'Storage and Handling'} maxLength={200} />
  </div>
)}

{data.drug_interactions !== null && String(data.drug_interactions) !== "undefined" && (
  <div className="border-top p-3">
    <Expander content={String(data.drug_interactions)} label={'Drug Interactions'} maxLength={200} />
  </div>
)}

{data.pregnancy !== null && String(data.pregnancy) !== "undefined" && (
  <div className="border-top p-3">
    <Expander content={String(data.pregnancy)} label={'Pregnancy'} maxLength={200} />
  </div>
)}

{data.nursing_mothers !== null && String(data.nursing_mothers) !== "undefined" && (
  <div className="border-top p-3">
    <Expander content={String(data.nursing_mothers)} label={'Nursing Mothers'} maxLength={200} />
  </div>
)}

{data.pediatric_use !== null && String(data.pediatric_use) !== "undefined" && (
  <div className="border-top p-3">
    <Expander content={String(data.pediatric_use)} label={'Pediatric Use'} maxLength={200} />
  </div>
)}

{data.geriatric_use !== null && String(data.geriatric_use) !== "undefined" && (
  <div className="border-top p-3">
    <Expander content={String(data.geriatric_use)} label={'Geriatric Use'} maxLength={200} />
  </div>
)}

{data.warnings_and_cautions !== null && String(data.warnings_and_cautions) !== "undefined" && (
  <div className="border-top p-3">
    <Expander content={String(data.warnings_and_cautions)} label={'Warnings and Cautions'} maxLength={200} />
  </div>
)}

      </div>
  );
}

export default Infobox;