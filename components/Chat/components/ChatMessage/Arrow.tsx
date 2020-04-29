import React from 'react';

interface ArrowProps {
  position: 'left' | 'right';
}

const Arrow = ({ position }: ArrowProps): JSX.Element => (
  <div
    className={`hidden sm:block w-0 h-0 mt-32 mb-6 border-t-48 border-b-48 border-l-48 transform ${
      position === 'left'
        ? 'border-orange-200 rotate-180 md:rotate-0'
        : 'border-blue-200 rotate-0 md:rotate-180'
    }`}
    style={{
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    }}
  />
);

export default Arrow;
