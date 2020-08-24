import React, { useRef, useEffect, useContext } from 'react';
import Seo from '../Seo';
import ChatList from './ChatList';
import SearchAndCreateSubjectBox from './SearchAndCreateSubjectBox';
import ChatContext from './ChatContext';
import ChatBoxRightSide, { RightSideState } from './ChatBoxRightSide';
import ChatBoxNav from './ChatBoxNav';

interface ChatBoxProps {
  selectedChatItemId?: string;
  showNewSubjectForm?: boolean;
}

const ChatBox = ({
  selectedChatItemId,
  showNewSubjectForm = false,
}: ChatBoxProps): JSX.Element => {
  const { search, setSearch, scope, setScope } = useContext(ChatContext);

  // When search or scope change scroll in chat list to the top
  const scrollableChatList = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollableChatList.current?.scrollTo(0, 0);
  }, [scrollableChatList, search, scope]);

  let rightSideState: RightSideState;
  if (showNewSubjectForm) {
    rightSideState = RightSideState.DisplayNewSubject;
  } else if (selectedChatItemId === undefined) {
    rightSideState = RightSideState.Empty;
  } else {
    rightSideState = RightSideState.DisplayDispute;
  }

  const displayLeftSideOnSmallDevices = rightSideState === RightSideState.Empty;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-chatBox h-full text-gray-900">
      <Seo title="Chat" />

      {/* top left */}
      <SearchAndCreateSubjectBox
        search={search}
        onSearchChange={setSearch}
        className={`row-start-1 col-start-1 border-b md:border-r ${
          displayLeftSideOnSmallDevices ? '' : 'hidden'
        } md:block`}
        scope={scope}
        onScopeChange={setScope}
      />

      {/* middle left */}
      <div
        className={`row-start-2 col-start-1 md:border-r overflow-y-auto ${
          displayLeftSideOnSmallDevices ? '' : 'hidden'
        } md:block pb-20`}
        ref={scrollableChatList}
      >
        <ChatList
          selectedChatItemId={selectedChatItemId}
          search={search}
          scope={scope}
        />
      </div>

      {/* bottom left */}
      <div
        className={`${
          displayLeftSideOnSmallDevices ? '' : 'hidden'
        } md:grid md:grid-cols-3 w-full absolute bottom-0 left-0 right-0 max-w-screen-lg mx-auto`}
      >
        <div className={`border-t md:border-r bg-white`}>
          <ChatBoxNav />
        </div>
      </div>

      {/* top right and bottom right */}
      <ChatBoxRightSide
        rightSideState={rightSideState}
        selectedChatItemId={selectedChatItemId}
      />
    </div>
  );
};

export default ChatBox;
