import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import {
  MessageVotesFragment,
  UserVoting,
} from '../../../../../graphql/generated/frontend';

interface VotesProps {
  votes: MessageVotesFragment;
}

const Votes = ({ votes }: VotesProps): JSX.Element => (
  <div className="flex w-full space-x-8 text-sm text-gray-600">
    <button
      className={`flex space-x-2 items-center ${
        votes.userVoting === UserVoting.Up ? 'text-blue-600' : ''
      }`}
    >
      <span>{votes.ups}</span>
      <FaThumbsUp />
    </button>
    <button
      className={`flex space-x-2 items-center ${
        votes.userVoting === UserVoting.Down ? 'text-blue-600' : ''
      }`}
    >
      <span>{votes.downs}</span>
      <FaThumbsDown />
    </button>
  </div>
);

export default Votes;
