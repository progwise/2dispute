import React from 'react';
import { useRouter } from 'next/router';
import { useMeUserInfoQuery } from '../graphql/generated/frontend';
import UserInfo from '../components/UserInfo';
import withApollo from '../utils/withApollo';
import { ChatBoxRightSideContent } from '../components/ChatBox/ChatBoxRightSide';

const Me = (): JSX.Element | null => {
  const { called, loading, data, error } = useMeUserInfoQuery();
  const router = useRouter();

  if (!called || loading) {
    return <ChatBoxRightSideContent>Loading...</ChatBoxRightSideContent>;
  }

  if (error || !data) {
    return (
      <ChatBoxRightSideContent>
        Fehler
        <br />
        {JSON.stringify(error)}
      </ChatBoxRightSideContent>
    );
  }

  if (!data.me) {
    router.push(`/api/auth/twitter?redirectTo=${router.asPath}`);
    return null;
  }

  return (
    <ChatBoxRightSideContent>
      <UserInfo user={data.me} />
    </ChatBoxRightSideContent>
  );
};

export default withApollo(Me);
