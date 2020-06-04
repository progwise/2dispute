import React from 'react';
import { useRouter } from 'next/router';
import { useMeUserInfoQuery } from '../graphql/generated/frontend';
import UserInfo from '../components/UserInfo';
import withApollo from '../utils/withApollo';

const Me = (): JSX.Element | null => {
  const { called, loading, data, error } = useMeUserInfoQuery();
  const router = useRouter();

  if (!called || loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return (
      <p>
        Fehler
        <br />
        {JSON.stringify(error)}
      </p>
    );
  }

  if (!data.me) {
    router.push(`/api/auth/twitter?redirectTo=${router.asPath}`);
    return null;
  }

  return <UserInfo user={data.me} />;
};

export default withApollo(Me);
