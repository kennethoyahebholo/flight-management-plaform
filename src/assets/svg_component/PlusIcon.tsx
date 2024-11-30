import React from 'react';

const PlusIcon = ({ stroke }: { stroke?: string }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.99935 4.16699V15.8337M4.16602 10.0003H15.8327"
        stroke={stroke || '#5941A9'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
