import React from 'react';

const Previous = ({ disabled }: any) => (
  <div className="prev">
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillOpacity={disabled ? 'rgba(196, 205, 213, 1)' : 'rgba(35, 35, 35, 1)'}
        d="M7.48901 1.69687L3.19526 6L7.48901 10.3031L6.16714 11.625L0.542139 6L6.16714 0.375L7.48901 1.69687Z"
        fill={disabled ? '#C4CDD5' : 'rgba(35, 35, 35, 1)'}
      />
    </svg>
  </div>
);

export default Previous;
