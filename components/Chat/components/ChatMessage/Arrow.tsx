import React from 'react';

interface ArrowProps {
  position: 'left' | 'right';
}

const Arrow = ({ position }: ArrowProps): JSX.Element => (
  <div
    className={`hidden sm:block w-0 h-0 mt-6 md:mt-24 mb-6 border-t-48 border-b-48 border-l-48 transform ${
      position === 'left'
        ? 'border-indigo-200 rotate-180 md:rotate-0 -ml-12 md:ml-0 md:-mr-12'
        : 'border-blue-200 rotate-0 md:rotate-180 -mr-12 md:mr-0 md:-ml-12'
    }`}
    style={{
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    }}
  />
);

export default Arrow;
