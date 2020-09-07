import React, { useRef, useEffect, useContext } from 'react';
import i18n from '../../utils/i18n';
import Seo from '../Seo';
import useDisplayChatListOnSmallDevices from '../../utils/react-hooks/useDisplayChatListOnSmallDevices';
import ChatList from './ChatList';
import SearchAndCreateSubjectBox from './SearchAndCreateSubjectBox';
import ChatContext from './ChatContext';
import ChatBoxNav from './ChatBoxNav';

interface ChatBoxProps {
  children: React.ReactNode;
}

const ChatBox = ({ children }: ChatBoxProps): JSX.Element => {
  const { search, setSearch, scope, setScope } = useContext(ChatContext);
  const displayChatListOnSmallDevices = useDisplayChatListOnSmallDevices();
  const { t } = i18n.useTranslation();

  // When search or scope change scroll in chat list to the top
  const scrollableChatList = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollableChatList.current?.scrollTo(0, 0);
  }, [scrollableChatList, search, scope]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-chatBox h-full text-gray-900">
      <Seo title={t('seo.title.chat')} />

      {/* top left */}
      <SearchAndCreateSubjectBox
        search={search}
        onSearchChange={setSearch}
        className={`row-start-1 col-start-1 border-b md:border-r ${
          displayChatListOnSmallDevices ? '' : 'hidden'
        } md:block`}
        scope={scope}
        onScopeChange={setScope}
      />

      {/* middle left */}
      <div
        className={`row-start-2 col-start-1 md:border-r overflow-y-auto ${
          displayChatListOnSmallDevices ? '' : 'hidden'
        } md:block pb-20`}
        ref={scrollableChatList}
      >
        <ChatList search={search} scope={scope} />
      </div>

      {/* bottom left */}
      <div
        className={`${
          displayChatListOnSmallDevices ? '' : 'hidden'
        } md:block w-full absolute bottom-0 left-0 right-0 px-8`}
      >
        <div className="md:grid md:grid-cols-3 max-w-screen-lg mx-auto">
          <div className={`border-t md:border-r bg-white`}>
            <ChatBoxNav />
          </div>
        </div>
      </div>

      {/* top right and bottom right */}
      {children}
    </div>
  );
};

export default ChatBox;
