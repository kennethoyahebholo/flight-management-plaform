import React from 'react';

interface IHambugerIcon {
  onClick?: React.MouseEventHandler<SVGElement>;
  strokeColor?: string;
}
export default function HambugerIcon({ onClick, strokeColor }: IHambugerIcon) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}>
      <path
        d="M3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13V11ZM21 13C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11V13ZM3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7V5ZM21 7C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5V7ZM3 17C2.44772 17 2 17.4477 2 18C2 18.5523 2.44772 19 3 19V17ZM21 19C21.5523 19 22 18.5523 22 18C22 17.4477 21.5523 17 21 17V19ZM3 13H21V11H3V13ZM3 7H21V5H3V7ZM3 19H21V17H3V19Z"
        fill={strokeColor || 'white'}
      />
    </svg>
  );
}
