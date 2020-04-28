import React from 'react';
import {
  ChatDisputeFragment,
  ChatPersonFragment,
} from '../../graphql/generated/graphql';
import ChatContainer from './components/ChatContainer';
import ChatMessage from './components/ChatMessage';
import ChatMessageForm, { ChatFormValues } from './components/ChatMessageForm';

interface DisputeChatProps {
  dispute: ChatDisputeFragment;
  me?: ChatPersonFragment | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNewMessage?: (values: ChatFormValues) => any;
}

enum UserState {
  PartnerA,
  PartnerB,
  Visitor,
}

const DisputeChat = ({
  dispute,
  me,
  onNewMessage,
}: DisputeChatProps): JSX.Element => {
  let userState: UserState;
  switch (me?.id) {
    case dispute.partnerA.id:
      userState = UserState.PartnerA;
      break;
    case dispute.partnerB.id:
      userState = UserState.PartnerB;
      break;
    default:
      userState = UserState.Visitor;
      break;
  }

  return (
    <ChatContainer>
      {dispute.messages.map(message => (
        <ChatMessage
          key={message.id}
          message={message}
          position={
            message.author.id === dispute.partnerA.id ? 'left' : 'right'
          }
        />
      ))}
      {userState !== UserState.Visitor && (
        <ChatMessageForm
          position={userState === UserState.PartnerA ? 'left' : 'right'}
          submitButtonText="Nachricht senden"
          onSubmit={onNewMessage}
        />
      )}
    </ChatContainer>
  );
};

export default DisputeChat;
