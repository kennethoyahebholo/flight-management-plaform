import React from 'react';

const ProfileAvatar = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width="48" height="48" rx="24" fill="white" />
      <rect x="2" y="4" width="44" height="44" fill="url(#pattern0_226_551)" />
      <defs>
        <pattern id="pattern0_226_551" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_226_551" transform="scale(0.000976562)" />
        </pattern>
        <image
          id="image0_226_551"
          width="1024"
          height="1024"
        />
      </defs>
    </svg>
  );
};

export default ProfileAvatar;