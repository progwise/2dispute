import React from 'react';
import { useRouter } from 'next/router';
import withApollo from '../../utils/withApollo';
import { UserInfoById, UserInfoHeader } from '../../components/UserInfo';
import {
  ChatBoxRightSideContent,
  ChatBoxHeader,
} from '../../components/ChatBox/ChatBoxRightSide';
import useUser from '../../utils/react-hooks/useUser';

const UserPage = (): JSX.Element => {
  const router = useRouter();
  const user = useUser();
  const userId: string | undefined = Array.isArray(router.query.userId)
    ? router.query.userId[0]
    : router.query.userId;

  if (userId === undefined) {
    return <ChatBoxRightSideContent>Loading</ChatBoxRightSideContent>;
  }

  if (userId === user?.twitterId) {
    router.replace('/me');
  }

  return (
    <>
      <ChatBoxHeader>
        <UserInfoHeader userId={userId} />
      </ChatBoxHeader>
      <ChatBoxRightSideContent>
        <UserInfoById userId={userId} />
      </ChatBoxRightSideContent>
    </>
  );
};

export default withApollo(UserPage);
