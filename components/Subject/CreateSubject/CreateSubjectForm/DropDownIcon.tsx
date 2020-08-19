import React from 'react';
import { FaCaretSquareUp, FaCaretSquareDown } from 'react-icons/fa';

interface DropDownIconProps {
  open: boolean;
  onClick: () => void;
}

const DropDownIcon = ({ open, onClick }: DropDownIconProps): JSX.Element => {
  const className = 'text-lg cursor-pointer';

  if (open) {
    return <FaCaretSquareUp className={className} onClick={onClick} />;
  } else {
    return <FaCaretSquareDown className={className} onClick={onClick} />;
  }
};

export default DropDownIcon;
