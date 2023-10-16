import React from 'react';

function BannedList({ banList }) {
  return (
    <div className="ban-list">
      <h2>Ban List</h2>
      <ul>
        {banList.map((attribute) => (
          <li key={attribute}>{attribute}</li>
        ))}
      </ul>
    </div>
  );
}

export default BannedList;