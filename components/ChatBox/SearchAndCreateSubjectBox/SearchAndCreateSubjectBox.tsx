import React from 'react';
import { useRouter } from 'next/router';
import { FaPen, FaUser, FaUserFriends } from 'react-icons/fa';
import Link from '../../Link/Link';
import { ChatScope } from '../../../graphql/generated/backend';
import useUser from '../../../utils/react-hooks/useUser';
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
}: SearchAndCreateSubjectBoxProps): JSX.Element => {
  const user = useUser();
  const router = useRouter();

  const handleScopeChange = (): void => {
    const isAuthenticated = user !== null;
    const newScope =
      scope === ChatScope.All ? ChatScope.UserScope : ChatScope.All;

    if (!isAuthenticated && newScope === ChatScope.UserScope) {
      router.push(`/api/auth/twitter?redirectTo=${router.asPath}`);
      return;
    }

    onScopeChange(newScope);
  };

  return (
    <div className={className}>
      <div className="flex w-full">
        <SearchBox
          search={search}
          onChange={onSearchChange}
          className="flex-grow"
        />
        <a
          className="flex-grow-0 flex items-center cursor-pointer text-blue-600 p-2"
          onClick={handleScopeChange}
          title={scope === ChatScope.All ? 'Alle Themen' : 'Meine Themen'}
        >
          {scope === ChatScope.All ? (
            <FaUserFriends className="text-2xl" />
          ) : (
            <FaUser />
          )}
        </a>
        <Link
          href={{ pathname: '/', query: { new: '' } }}
          className="flex-grow-0 flex items-center"
        >
          <FaPen className="m-2" />
        </Link>
      </div>
    </div>
  );
};

export default SearchAndCreateSubjectBox;
