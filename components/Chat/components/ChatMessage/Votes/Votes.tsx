import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import {
  MessageVotesFragment,
  UserVoting,
  useVoteMutation,
} from '../../../../../graphql/generated/frontend';

interface VotesProps {
  votes: MessageVotesFragment;
  messageId: string;
}

const Votes = ({ votes, messageId }: VotesProps): JSX.Element => {
  const [voteMutation, { loading }] = useVoteMutation();

  const vote = (newVoting: UserVoting): void => {
    const undoVoting = votes.userVoting === newVoting;
    const voting = undoVoting ? UserVoting.None : newVoting;
    voteMutation({ variables: { messageId, voting } });
  };

  return (
    <div className="flex flex-wrap w-full space-x-8 text-sm text-gray-600">
      <button
        className={`flex space-x-2 items-center ${
          votes.userVoting === UserVoting.Up ? 'text-blue-600' : ''
        }`}
        onClick={(): void => vote(UserVoting.Up)}
        disabled={loading}
      >
        <span>{votes.ups}</span>
        <FaThumbsUp />
      </button>
      <button
        className={`flex space-x-2 items-center ${
          votes.userVoting === UserVoting.Down ? 'text-blue-600' : ''
        }`}
        onClick={(): void => vote(UserVoting.Down)}
        disabled={loading}
      >
        <span>{votes.downs}</span>
        <FaThumbsDown />
      </button>
    </div>
  );
};

export default Votes;
