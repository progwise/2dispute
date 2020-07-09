import React from 'react';
import { ChatPersonFragment } from '../../../../graphql/generated/frontend';

interface ChatListItemUserProps {
  user: ChatPersonFragment;
  isSelected?: boolean;
}

const ChatListItemUser = ({
  user,
  isSelected = false,
}: ChatListItemUserProps): JSX.Element => (
  <div
    className="flex items-center text-xs space-x-1"
    title={`${user.name}\n@${user.twitterHandle}`}
  >
    <img src={user.picture ?? ''} className="rounded-full w-12 h-12" />
    <span className="truncate">
      {user.name}
      <br />
      <span className={isSelected ? '' : 'text-blue-600'}>
        @{user.twitterHandle}
      </span>
    </span>
  </div>
);

export default ChatListItemUser;
