import { UrlObject } from 'url';
import React, { useState, useRef } from 'react';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import { DisputeInHeaderFragment } from '../../../../../graphql/generated/frontend';
import constants from '../../../../../utils/constants';
import useUser from '../../../../../utils/react-hooks/useUser';
import useOutSideClick from '../../../../../utils/react-hooks/useOutsideClick';
import DisputeDropdownItem from './DisputeDropdownItem';

const CREATE_NEW_DISPUTE_TEXT = 'Ein neuen Dispute starten';

const createDisputeText = (dispute: DisputeInHeaderFragment): string => {
  const partnerNameA = dispute.partnerA.name ?? constants.FALLBACK_USER.NAME;
  const partnerNameB = dispute.partnerB.name ?? constants.FALLBACK_USER.NAME;
  return `${partnerNameA} vs. ${partnerNameB}`;
};

interface DisputeDropdownProps {
  disputes: DisputeInHeaderFragment[];
  selectedChatItem: string;
  subjectId: string;
}

const DisputeDropdown = ({
  disputes,
  selectedChatItem,
  subjectId,
}: DisputeDropdownProps): JSX.Element => {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const toggleOpen = (): void => setOpen(oldState => !oldState);
  const listRef = useRef<HTMLUListElement>(null);

  useOutSideClick(
    listRef,
    () => {
      if (open) setOpen(false);
    },
    [open, setOpen],
  );

  const newDisputeLink: UrlObject = user
    ? { pathname: '/', query: { chatId: subjectId } }
    : {
        pathname: '/api/auth/twitter',
        query: { redirectTo: `/?chatId=${subjectId}` },
      };

  const handleClick = (): void => setOpen(false);

  const currentDispute = disputes.find(
    dispute => dispute.id === selectedChatItem,
  );
  const selectedItemText =
    currentDispute !== undefined
      ? createDisputeText(currentDispute)
      : selectedChatItem === subjectId
      ? CREATE_NEW_DISPUTE_TEXT
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
            href={newDisputeLink}
            isSelected={selectedChatItem === subjectId}
            onClick={handleClick}
          >
            {CREATE_NEW_DISPUTE_TEXT}
          </DisputeDropdownItem>
          {disputes.map(dispute => (
            <DisputeDropdownItem
              key={dispute.id}
              href={{ pathname: '/', query: { chatId: dispute.id } }}
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
