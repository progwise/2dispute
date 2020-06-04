import React from 'react';
import { useRouter } from 'next/router';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import {
  MessageVotesFragment,
  UserVoting,
  useVoteMutation,
} from '../../../../../graphql/generated/frontend';

interface VotesProps {
  votes: MessageVotesFragment;
  messageId: string;
  isAuthenticated: boolean;
}

const Votes = ({
  votes,
  messageId,
  isAuthenticated,
}: VotesProps): JSX.Element => {
  const [voteMutation] = useVoteMutation();
  const router = useRouter();

  const vote = (newVoting: UserVoting): void => {
    if (!isAuthenticated) {
      router.push(`/api/auth/twitter?redirectTo=${router.asPath}`);
      return;
    }

    const undoVoting = votes.userVoting === newVoting;
    const voting = undoVoting ? UserVoting.None : newVoting;
    voteMutation({
      variables: { messageId, voting },
      optimisticResponse: {
        vote: {
          id: messageId,
          votes: {
            ups:
              votes.ups -
              (votes.userVoting === UserVoting.Up ? 1 : 0) +
              (voting === UserVoting.Up ? 1 : 0),
            downs:
              votes.downs -
              (votes.userVoting === UserVoting.Down ? 1 : 0) +
              (voting === UserVoting.Down ? 1 : 0),
            userVoting: voting,
            __typename: 'Votes',
          },
          __typename: 'Message',
        },
      },
    });
  };

  return (
    <div className="flex flex-wrap w-full space-x-8 text-sm text-gray-600">
      <button
        className={`flex space-x-2 items-center ${
          votes.userVoting === UserVoting.Up ? 'text-blue-600' : ''
        }`}
        onClick={(): void => vote(UserVoting.Up)}
      >
        <span>{votes.ups}</span>
        <FaThumbsUp />
      </button>
      <button
        className={`flex space-x-2 items-center ${
          votes.userVoting === UserVoting.Down ? 'text-blue-600' : ''
        }`}
        onClick={(): void => vote(UserVoting.Down)}
      >
        <span>{votes.downs}</span>
        <FaThumbsDown />
      </button>
    </div>
  );
};

export default Votes;
