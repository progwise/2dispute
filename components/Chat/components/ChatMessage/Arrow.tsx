import React from 'react';

interface ArrowProps {
  position: 'left' | 'right';
}

const Arrow = ({ position }: ArrowProps): JSX.Element => (
  <div
    className={`w-0 h-0 mt-32 mb-6 border-t-48 border-b-48 ${
      position === 'left'
        ? 'border-orange-200 border-l-48'
        : 'border-blue-200 border-r-48'
    } `}
    style={{
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    }}
  />
);

export default Arrow;
