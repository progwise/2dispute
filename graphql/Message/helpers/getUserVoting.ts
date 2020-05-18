import { MessageDocument } from '../MessageSchema';
import { UserVoting } from '../../generated/backend';

const getUserVoting = (
  message: MessageDocument,
  userId: string,
): UserVoting => {
  const isUpVoter = message.upVoters.includes(userId);
  const isDownVoter = message.downVoters.includes(userId);
  if (isUpVoter) {
    return UserVoting.Up;
  }
  if (isDownVoter) {
    return UserVoting.Down;
  }

  return UserVoting.None;
};

export default getUserVoting;
