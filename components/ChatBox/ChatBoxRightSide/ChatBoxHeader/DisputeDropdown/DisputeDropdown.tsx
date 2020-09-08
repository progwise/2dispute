import { UrlObject } from 'url';
import React, { useState, useRef } from 'react';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import {
  DisputeInHeaderFragment,
  SubjectInHeaderFragment,
} from '../../../../../graphql/generated/frontend';
import constants from '../../../../../utils/constants';
import useUser from '../../../../../utils/react-hooks/useUser';
import useOutSideClick from '../../../../../utils/react-hooks/useOutsideClick';
import { useTranslation } from '../../../../../utils/i18n';
import DisputeDropdownItem from './DisputeDropdownItem';

const createDisputeText = (dispute: DisputeInHeaderFragment): string => {
  const partnerNameA = dispute.partnerA.name ?? constants.FALLBACK_USER.NAME;
  const partnerNameB = dispute.partnerB.name ?? constants.FALLBACK_USER.NAME;
  return `${partnerNameA} vs. ${partnerNameB}`;
};

interface DisputeDropdownProps {
  subject: SubjectInHeaderFragment;
  selectedChatItem: string;
}

const DisputeDropdown = ({
  subject,
  selectedChatItem,
}: DisputeDropdownProps): JSX.Element => {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const toggleOpen = (): void => setOpen(oldState => !oldState);
  const listRef = useRef<HTMLUListElement>(null);
  const { t } = useTranslation();

  useOutSideClick(
    listRef,
    () => {
      if (open) setOpen(false);
    },
    [open, setOpen],
  );

  const newDisputeLinkHref: UrlObject | string = user
    ? '/[chatItemId]'
    : {
        pathname: '/api/auth/twitter',
        query: { redirectTo: `/${subject.id}` },
      };
  const newDisputeLinkAs: string | undefined = user
    ? `/${subject.id}`
    : undefined;

  const handleClick = (): void => setOpen(false);

  const dropdownItemTextForSubjectPage =
    user?.twitterId === subject.author.id
      ? t('chat.header.chooseDispute')
      : t('chat.header.startDispute');

  const currentDispute = subject.disputes.find(
    dispute => dispute.id === selectedChatItem,
  );
  const selectedItemText =
    currentDispute !== undefined
      ? createDisputeText(currentDispute)
      : selectedChatItem === subject.id
      ? dropdownItemTextForSubjectPage
      : undefined;

  return (
    <div>
      <div
        className="flex items-center p-2 rounded-lg text-sm bg-gray-200 space-x-2 cursor-pointer"
        onClick={toggleOpen}
      >
        <div>{selectedItemText}</div>
        {open ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
      </div>
      {open ? (
        <ul
          className="fixed bg-gray-100 shadow rounded-lg border z-20 mt-2"
          ref={listRef}
        >
          <DisputeDropdownItem
            href={newDisputeLinkHref}
            as={newDisputeLinkAs}
            isSelected={selectedChatItem === subject.id}
            onClick={handleClick}
          >
            {dropdownItemTextForSubjectPage}
          </DisputeDropdownItem>
          {subject.disputes.map(dispute => (
            <DisputeDropdownItem
              key={dispute.id}
              href="/[chatItemId]"
              as={`/${dispute.id}`}
              isSelected={dispute.id === selectedChatItem}
              onClick={handleClick}
            >
              {createDisputeText(dispute)}
            </DisputeDropdownItem>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DisputeDropdown;
