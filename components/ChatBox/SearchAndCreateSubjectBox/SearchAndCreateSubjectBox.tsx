import React from 'react';
import { useRouter } from 'next/router';
import { FaPen, FaUser, FaUserFriends, FaLanguage } from 'react-icons/fa';
import Link from '../../Link/Link';
import { ChatScope } from '../../../graphql/generated/backend';
import useUser from '../../../utils/react-hooks/useUser';
import i18nInstance from '../../../utils/i18n';
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
  const { t, i18n } = i18nInstance.useTranslation();

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

  const handleToggleLanguage = (): Promise<unknown> =>
    i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en');

  return (
    <div className={className}>
      <div className="flex items-center w-full h-full">
        <SearchBox
          search={search}
          onChange={onSearchChange}
          className="flex-grow"
        />
        <a
          className="flex-grow-0 flex items-center cursor-pointer text-blue-600 p-2"
          onClick={handleScopeChange}
          title={
            scope === ChatScope.All
              ? t('searchAndCreateBox.allDisputes')
              : t('searchAndCreateBox.myDisputes')
          }
        >
          {scope === ChatScope.All ? (
            <FaUserFriends className="text-2xl" />
          ) : (
            <FaUser />
          )}
        </a>
        <Link
          href="/new"
          className="flex-grow-0 flex items-center"
          title={t('searchAndCreateBox.createDispute')}
        >
          <FaPen className="m-2" />
        </Link>
        <a
          className="text-blue-600 text-2xl cursor-pointer"
          onClick={handleToggleLanguage}
          title={t('searchAndCreateBox.changeLanguage')}
        >
          <FaLanguage className="m-2" />
        </a>
      </div>
    </div>
  );
};

export default SearchAndCreateSubjectBox;
