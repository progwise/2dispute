import React from 'react';
import { FaPen } from 'react-icons/fa';
import Link from '../../Link/Link';
import { ChatScope } from '../../../graphql/generated/backend';
import SearchBox from './SearchBox';
import ScopeLink from './ScopeLink';

interface SearchAndCreateSubjectBoxProps {
  onSearchChange: (newSearch: string) => void;
  className?: string;
  scope: ChatScope;
  onScopeChange: (newScope: ChatScope) => unknown;
}

const SearchAndCreateSubjectBox = ({
  onSearchChange,
  className = '',
  scope,
  onScopeChange,
}: SearchAndCreateSubjectBoxProps): JSX.Element => (
  <div className={className}>
    <div className="flex w-full">
      <SearchBox onChange={onSearchChange} className="flex-grow" />
      <Link href="/subjects/create" className="flex-grow-0 flex items-center">
        <FaPen className="m-2" />
      </Link>
    </div>
    <div className="text-sm px-3">
      <ScopeLink
        isSelected={scope === ChatScope.All}
        onClick={(): unknown => onScopeChange(ChatScope.All)}
      >
        Alle
      </ScopeLink>{' '}
      /{' '}
      <ScopeLink
        isSelected={scope === ChatScope.UserScope}
        onClick={(): unknown => onScopeChange(ChatScope.UserScope)}
      >
        Meine
      </ScopeLink>{' '}
      Dispute
    </div>
  </div>
);

export default SearchAndCreateSubjectBox;
