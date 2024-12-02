import React from 'react';

const Next = ({ disabled }: { disabled?: boolean }) => (
  <div className="next">
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillOpacity={disabled ? 'rgba(196, 205, 213, 1)' : 'rgba(35, 35, 35, 1)'}
        d="M0.626709 1.69687L4.92046 6L0.626709 10.3031L1.94858 11.625L7.57358 6L1.94858 0.375L0.626709 1.69687Z"
        fill={disabled ? '#C4CDD5' : 'rgba(35, 35, 35, 1)'}
      />
    </svg>
  </div>
);

export default Next;
