import React from 'react';
import { ChatPersonFragment } from '../../../../graphql/generated/frontend';
import constants from '../../../../utils/constants';

interface ChatListItemUserProps {
  user: ChatPersonFragment;
  isSelected?: boolean;
}

const ChatListItemUser = ({
  user,
  isSelected = false,
}: ChatListItemUserProps): JSX.Element => {
  const userName = user.name ?? constants.FALLBACK_USER.NAME;
  const userPicture = user.picture ?? constants.FALLBACK_USER.PICTURE;
  const userTwitterHandle = user.twitterHandle
    ? `@${user.twitterHandle}`
    : null;

  const title = [userName, userTwitterHandle]
    .filter(string => !!string)
    .join('\n');

  return (
    <div className="flex items-center text-xs space-x-1" title={title}>
      <img src={userPicture} className="rounded-full w-12 h-12" />
      <span className="truncate">
        {userName}
        {userTwitterHandle ? (
          <>
            <br />
            <span className={isSelected ? '' : 'text-blue-600'}>
              {userTwitterHandle}
            </span>
          </>
        ) : null}
      </span>
    </div>
  );
};

export default ChatListItemUser;
