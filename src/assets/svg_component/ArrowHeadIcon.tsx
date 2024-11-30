import React from 'react';

const ArrowHeadIcon = ({ stroke }: { stroke?: string }) => {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.33203 1.33366L1.66536 6.00033L6.33203 10.667"
        stroke={stroke || 'black'}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default ArrowHeadIcon;
