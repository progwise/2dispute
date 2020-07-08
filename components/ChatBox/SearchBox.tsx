import React from 'react';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';

interface SearchBoxProps {
  onChange: (newValue: string) => void;
}

const SearchBox = ({ onChange }: SearchBoxProps): JSX.Element => {
  const handleReset = (): void => onChange('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    onChange(event.target.value);

  return (
    <form
      className="flex items-center px-2 my-2 bg-gray-200 rounded-lg text-sm text-gray-700 space-x-2"
      onReset={handleReset}
    >
      <FaSearch />
      <input
        className="bg-transparent w-full py-2 outline-none"
        placeholder="Suche"
        onChange={handleChange}
      />
      <button type="reset" className="self-stretch outline-none">
        <FaTimesCircle />
      </button>
    </form>
  );
};

export default SearchBox;
