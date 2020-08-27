import React from 'react';
import Seo from '../../Seo';
import {
  CreateSubjectProvider,
  CreateSubjectForm,
} from '../../Subject/CreateSubject';
import { Input } from '../../Input';
import ChatBoxRightSideContent from './ChatBoxRightSideContent';
import ChatItem from './ChatItem';
import ChatBoxHeader, { ChatItemHeader } from './ChatBoxHeader';
import ChatBoxRightSideEmpty from './ChatBoxRightSideEmpty';

export enum RightSideState {
  DisplayNewSubject,
  DisplayDispute,
  Empty,
}

interface ChatBoxRightSideProps {
  rightSideState: RightSideState;
  selectedChatItemId?: string;
}

const ChatBoxRightSide = ({
  rightSideState,
  selectedChatItemId,
}: ChatBoxRightSideProps): JSX.Element | null => {
  const displayOnSmallDevices = rightSideState !== RightSideState.Empty;

  switch (rightSideState) {
    case RightSideState.DisplayDispute:
      if (selectedChatItemId === undefined) {
        return null;
      }
      return (
        <>
          <ChatItemHeader
            chatItemId={selectedChatItemId}
            displayOnSmallDevices={displayOnSmallDevices}
          />
          <ChatBoxRightSideContent
            displayOnSmallDevices={displayOnSmallDevices}
          >
            <ChatItem chatItemId={selectedChatItemId} />
          </ChatBoxRightSideContent>
        </>
      );

    case RightSideState.DisplayNewSubject:
      return (
        <CreateSubjectProvider>
          <>
            <Seo title="Neues Thema erstellen" />
            <ChatBoxHeader displayOnSmallDevices={displayOnSmallDevices}>
              <Input
                className="flex-grow md:!ml-0"
                name="subject"
                placeholder="Neues Thema"
              />
            </ChatBoxHeader>
            <ChatBoxRightSideContent
              displayOnSmallDevices={displayOnSmallDevices}
            >
              <CreateSubjectForm />
            </ChatBoxRightSideContent>
          </>
        </CreateSubjectProvider>
      );

    case RightSideState.Empty:
      return (
        <ChatBoxRightSideContent displayOnSmallDevices={displayOnSmallDevices}>
          <ChatBoxRightSideEmpty />
        </ChatBoxRightSideContent>
      );

    default:
      return null;
  }
};

export default ChatBoxRightSide;
