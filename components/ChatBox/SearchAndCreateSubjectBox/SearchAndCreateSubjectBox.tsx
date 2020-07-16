import React from 'react';
import { FaPen, FaUser, FaUserFriends } from 'react-icons/fa';
import Link from '../../Link/Link';
import { ChatScope } from '../../../graphql/generated/backend';
import SearchBox from './SearchBox';

interface SearchAndCreateSubjectBoxProps {
  search: string;
  onSearchChange: (newSearch: string) => void;
  className?: string;
  scope: ChatScope;
  onScopeChange: (newScope: ChatScope) => unknown;
}

const SearchAndCreateSubjectBox = ({
  search,
  onSearchChange,
  className = '',
  scope,
  onScopeChange,
}: SearchAndCreateSubjectBoxProps): JSX.Element => (
  <div className={className}>
    <div className="flex w-full">
      <SearchBox
        search={search}
        onChange={onSearchChange}
        className="flex-grow"
      />
      <a
        className="flex-grow-0 flex items-center cursor-pointer text-blue-600 p-2"
        onClick={(): unknown =>
          onScopeChange(
            scope === ChatScope.All ? ChatScope.UserScope : ChatScope.All,
          )
        }
        title={scope === ChatScope.All ? 'Alle Themen' : 'Meine Themen'}
      >
        {scope === ChatScope.All ? (
          <FaUserFriends className="text-2xl" />
        ) : (
          <FaUser />
        )}
      </a>
      <Link href="/subjects/create" className="flex-grow-0 flex items-center">
        <FaPen className="m-2" />
      </Link>
    </div>
  </div>
);

export default SearchAndCreateSubjectBox;
