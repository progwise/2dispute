import React from 'react';
import { FaPen } from 'react-icons/fa';
import Link from '../../Link/Link';
import SearchBox from './SearchBox';

interface SearchAndCreateSubjectBoxProps {
  onSearchChange: (newSearch: string) => void;
  className?: string;
}

const SearchAndCreateSubjectBox = ({
  onSearchChange,
  className = '',
}: SearchAndCreateSubjectBoxProps): JSX.Element => (
  <div className={`flex ${className}`}>
    <SearchBox onChange={onSearchChange} className="flex-grow" />
    <Link href="/subjects/create" className="flex-grow-0 flex items-center">
      <FaPen className="m-2" />
    </Link>
  </div>
);

export default SearchAndCreateSubjectBox;
