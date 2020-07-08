import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import Dispute from '../Dispute/Dispute';
import { useFullPage } from '../FullPage';
import Link from '../Link/Link';
import ChatList from './ChatList';
import SearchBox from './SearchBox';

interface ChatBoxProps {
  selectedDisputeId?: string;
}

const ChatBox = ({ selectedDisputeId }: ChatBoxProps): JSX.Element => {
  const [search, setSearch] = useState('');
  useFullPage();

  const isDisputeSelected = selectedDisputeId !== undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-chatBox col-gap-8 h-full text-gray-900">
      <div
        className={`h-full min-h-full md:flex flex-col bg-gray-10 ${
          isDisputeSelected && 'hidden'
        }`}
      >
        <div className="flex">
          <SearchBox onChange={setSearch} className="flex-grow" />
          <Link
            href="/subjects/create"
            className="flex-grow-0 flex items-center"
          >
            <FaPen className="m-2" />
          </Link>
        </div>
        <div className="overflow-y-auto">
          <ChatList selectedDisputeId={selectedDisputeId} search={search} />
        </div>
      </div>
      <div
        className={`h-full min-h-full flex flex-col ${
          !isDisputeSelected && 'hidden md:block'
        }`}
      >
        <Link
          href="/chat"
          className="bg-gray-200 block no-underline text-center border p-2 rounded-lg my-2 md:hidden"
        >
          Zurück zur Chat Liste
        </Link>
        {selectedDisputeId && (
          <div className="overflow-y-auto">
            <Dispute disputeId={selectedDisputeId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
