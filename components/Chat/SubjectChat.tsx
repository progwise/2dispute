import React from 'react';
import {
  ChatSubjectFragment,
  ChatPersonFragment,
} from '../../graphql/generated/graphql';
import ChatContainer from './components/ChatContainer';
import ChatPartners from './components/ChatPartners';
import ChatMessage from './components/ChatMessage';
import ChatMessageForm, { ChatFormValues } from './components/ChatMessageForm';
import Button from '../Button/Button';
import { useRouter } from 'next/router';

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
      <ChatPartners
        partnerA={subject.author}
        partnerB={(userState !== UserState.Author && me) || undefined}
      />
      <ChatMessage position="left" text={subject.firstMessage.text} />
      {userState === UserState.Visitor && (
        <ChatMessageForm
          position="right"
          submitButtonText="Disput Starten"
          onSubmit={onNewMessage}
        />
      )}
      {userState === UserState.Unauthenticated && (
        <div className="col-start-1 col-span-4 py-4 flex justify-center">
          <Button onClick={handleLoginClick}>
            Melden Sie sich an, um auf dieses Thema zu antworten.
          </Button>
        </div>
      )}
    </ChatContainer>
  );
};

export default SubjectChat;
