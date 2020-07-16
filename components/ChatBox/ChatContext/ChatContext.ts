import { createContext } from 'react';
import { ChatScope } from '../../../graphql/generated/frontend';

interface ChatContextInterface {
  search: string;
  setSearch: (newString: string) => void;
  scope: ChatScope;
  setScope: (newChatScope: ChatScope) => void;
}

const ChatContext = createContext<ChatContextInterface>({
  search: '',
  setSearch: () => undefined,
  scope: ChatScope.All,
  setScope: () => undefined,
});

export default ChatContext;
