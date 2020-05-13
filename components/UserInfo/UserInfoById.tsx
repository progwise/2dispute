import React from 'react';
import { useGetUserInfoByIdQuery } from '../../graphql/generated/frontend';
import UserInfo from './UserInfo';

interface UserInfoByIdProps {
  userId: string;
}

const UserInfoById = ({ userId }: UserInfoByIdProps): JSX.Element => {
  const { called, loading, data, error } = useGetUserInfoByIdQuery({
    variables: { userId },
  });

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

  if (!data.user) {
    return <p>User nicht gefunden</p>;
  }

  return <UserInfo user={data.user} />;
};

export default UserInfoById;
