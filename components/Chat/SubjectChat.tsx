import React from 'react';
import { useRouter } from 'next/router';
import {
  ChatSubjectFragment,
  ChatPersonFragment,
} from '../../graphql/generated/graphql';
import Button from '../Button/Button';
import ChatContainer from './components/ChatContainer';
import ChatMessage from './components/ChatMessage';
import ChatMessageForm, { ChatFormValues } from './components/ChatMessageForm';

interface SubjectChatProps {
  subject: ChatSubjectFragment;
  me?: ChatPersonFragment | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNewMessage?: (values: ChatFormValues) => any;
}

enum UserState {
  Author,
  Visitor,
  Unauthenticated,
}

const SubjectChat = ({
  subject,
  me,
  onNewMessage,
}: SubjectChatProps): JSX.Element => {
  const router = useRouter();

  let userState: UserState;
  switch (me?.id) {
    case subject.author.id:
      userState = UserState.Author;
      break;
    case undefined:
      userState = UserState.Unauthenticated;
      break;
    default:
      userState = UserState.Visitor;
      break;
  }

  const handleLoginClick = (): Promise<boolean> =>
    router.push(`/api/login?redirectTo=${router.asPath}`);

  return (
    <ChatContainer>
      <ChatMessage
        position="left"
        text={subject.firstMessage.text}
        author={subject.author}
      />
      {userState === UserState.Visitor && (
        <ChatMessageForm
          position="right"
          submitButtonText="Disput Starten"
          onSubmit={onNewMessage}
        />
      )}
      {userState === UserState.Unauthenticated && (
        <div className="col-start-1 col-span-3 py-4 flex justify-center">
          <Button onClick={handleLoginClick}>
            Melden Sie sich an, um auf dieses Thema zu antworten.
          </Button>
        </div>
      )}
    </ChatContainer>
  );
};

export default SubjectChat;
