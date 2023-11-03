import React, { useState } from 'react';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

function Expander({ content, label, maxLength = 200 }) {
    const startExpanded = () => {
        if (content.length > maxLength)
        {
            return false;
        }
        else
        {
            return true;
        }

    };
    const [expanded, setExpanded] = useState(startExpanded);

    const toggleExpand = () => {
        setExpanded(!expanded);
      };
      console.log(content.length)

  return (
    <div className="expandable-description container">
      <div className="label-container row cursor-pointer">
        <div className="label col-sm-8 cursor-pointer labeltext" onClick={toggleExpand}>{label}</div>
        <button className="btn btn-link col-sm-4 dropdownicon" onClick={toggleExpand}>
          <FontAwesomeIcon icon={expanded ? faAngleDown : faAngleRight} />
        </button>
      </div>
      {expanded && (
        <div className="content">
          {content}
        </div>
      )}
    </div>
  );
}
export default Expander;