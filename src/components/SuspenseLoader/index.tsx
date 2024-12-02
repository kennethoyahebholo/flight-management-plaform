import React from 'react';

import CircularLoadingSpinner from '../CircularLoadingSpinner';

const SuspenseLoader = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
      <CircularLoadingSpinner />
    </div>
  );
};

export default SuspenseLoader;
