import React, { useState } from 'react';
import Dispute from '../Dispute/Dispute';
import { useFullPage } from '../FullPage';
import ChatList from './ChatList';
import DisputeHeader from './DisputeHeader';
import SearchAndCreateSubjectBox from './SearchAndCreateSubjectBox';

interface ChatBoxProps {
  selectedDisputeId?: string;
}

const ChatBox = ({ selectedDisputeId }: ChatBoxProps): JSX.Element => {
  const [search, setSearch] = useState('');
  useFullPage();

  const isDisputeSelected = selectedDisputeId !== undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-chatBox h-full text-gray-900">
      <SearchAndCreateSubjectBox
        onSearchChange={setSearch}
        className={`border-b md:border-r ${
          isDisputeSelected && 'hidden'
        } md:flex`}
      />

      {selectedDisputeId !== undefined && (
        <DisputeHeader
          disputeId={selectedDisputeId}
          className="md:col-span-2 border-b px-4"
        />
      )}
      <div
        className={`row-start-2 md:border-r overflow-y-auto ${
          isDisputeSelected && 'hidden'
        } md:block`}
      >
        <ChatList selectedDisputeId={selectedDisputeId} search={search} />
      </div>
      {selectedDisputeId && (
        <div className="md:col-span-2 overflow-y-auto px-4">
          <Dispute disputeId={selectedDisputeId} />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
