import React from 'react';
import { useRouter } from 'next/router';
import withApollo from '../../utils/withApollo';
import { UserInfoById, UserInfoHeader } from '../../components/UserInfo';
import {
  ChatBoxRightSideContent,
  ChatBoxHeader,
} from '../../components/ChatBox/ChatBoxRightSide';

const UserPage = (): JSX.Element => {
  const router = useRouter();
  const userId: string | undefined = Array.isArray(router.query.userId)
    ? router.query.userId[0]
    : router.query.userId;

  if (userId === undefined) {
    return <ChatBoxRightSideContent>Loading</ChatBoxRightSideContent>;
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
