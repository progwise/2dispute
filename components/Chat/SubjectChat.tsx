import React from 'react';
import { useRouter } from 'next/router';
import {
  ChatSubjectFragment,
  ChatPersonFragment,
} from '../../graphql/generated/frontend';
import { useTranslation } from '../../utils/i18n';
import Button from '../Button/Button';
import ChatContainer from './components/ChatContainer';
import ChatMessage from './components/ChatMessage';
import ChatMessageForm, { ChatFormValues } from './components/ChatMessageForm';
import ChatItemFullWidth from './components/ChatItemFullWidth';

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
  const { t } = useTranslation();

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
    router.push(`/api/auth/twitter?redirectTo=${router.asPath}`);

  return (
    <ChatContainer>
      <ChatMessage
        position="left"
        message={subject.firstMessage}
        isAuthenticated={!!me}
      />
      {me && userState === UserState.Visitor && (
        <ChatMessageForm
          user={me}
          position="right"
          submitButtonText={t('chat.form.startDispute')}
          onSubmit={onNewMessage}
        />
      )}
      {userState === UserState.Unauthenticated && (
        <ChatItemFullWidth className="py-4 flex justify-center">
          <Button onClick={handleLoginClick}>
            {t('chat.form.signInToReply')}
          </Button>
        </ChatItemFullWidth>
      )}
    </ChatContainer>
  );
};

export default SubjectChat;
