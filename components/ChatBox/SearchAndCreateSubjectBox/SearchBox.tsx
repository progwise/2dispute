import React from 'react';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import { useTranslation } from '../../../utils/i18n';

interface SearchBoxProps {
  search: string;
  onChange: (newValue: string) => void;
  className?: string;
}

const SearchBox = ({
  search,
  onChange,
  className = '',
}: SearchBoxProps): JSX.Element => {
  const { t } = useTranslation();

  const handleReset = (): void => onChange('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    onChange(event.target.value);

  return (
    <form
      className={`flex items-center px-2 my-2 bg-gray-200 rounded-lg text-sm text-gray-700 space-x-2 ${className}`}
      onReset={handleReset}
    >
      <FaSearch />
      <input
        className="bg-transparent min-w-0 max-w-full flex-grow py-2 outline-none"
        placeholder={t('searchAndCreateBox.search')}
        onChange={handleChange}
        defaultValue={search}
        size={1}
      />
      <button type="reset" className="self-stretch outline-none">
        <FaTimesCircle />
      </button>
    </form>
  );
};

export default SearchBox;
