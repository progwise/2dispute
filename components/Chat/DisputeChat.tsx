import React from 'react';
import {
  ChatDisputeFragment,
  ChatPersonFragment,
  ChatMessageFragment,
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

interface CombinedMessage {
  authorId: string;
  messages: ChatMessageFragment[];
  id: string;
}

const addMessageToLastCombinedMessage = (
  state: CombinedMessage[],
  newMessage: ChatMessageFragment,
): CombinedMessage[] =>
  state.map((combinedMessage, index) => {
    if (index === state.length - 1) {
      return {
        ...combinedMessage,
        messages: [...combinedMessage.messages, newMessage],
      };
    }
    return combinedMessage;
  });

const combineMessage = (messages: ChatMessageFragment[]): CombinedMessage[] =>
  messages.reduce((state: CombinedMessage[], newMessage) => {
    const lastCombinedMessage: CombinedMessage | undefined =
      state[state.length - 1];

    if (lastCombinedMessage?.authorId === newMessage.author.id) {
      return addMessageToLastCombinedMessage(state, newMessage);
    }

    return [
      ...state,
      {
        authorId: newMessage.author.id,
        id: newMessage.id,
        messages: [newMessage],
      },
    ];
  }, []);

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
      {combineMessage(dispute.messages).map(combinedMessage => (
        <ChatMessage
          key={combinedMessage.id}
          message={combinedMessage.messages}
          position={
            combinedMessage.authorId === dispute.partnerA.id ? 'left' : 'right'
          }
        />
      ))}
      {me && userState !== UserState.Visitor && (
        <ChatMessageForm
          position={userState === UserState.PartnerA ? 'left' : 'right'}
          user={me}
          submitButtonText="Nachricht senden"
          onSubmit={onNewMessage}
        />
      )}
    </ChatContainer>
  );
};

export default DisputeChat;
