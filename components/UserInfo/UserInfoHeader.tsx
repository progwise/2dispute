import React from 'react';
import { useGetUserInfoByIdQuery } from '../../graphql/generated/frontend';
import constants from '../../utils/constants';

interface UserInfoHeaderProps {
  userId: string;
}

const UserInfoHeader = ({
  userId,
}: UserInfoHeaderProps): JSX.Element | null => {
  const { data } = useGetUserInfoByIdQuery({ variables: { userId } });

  if (!data?.user) {
    return null;
  }

  return (
    <>
      <img
        className="w-10 h-10 rounded-full"
        src={data.user.picture ?? constants.FALLBACK_USER.PICTURE}
      />
      <span className="flex-grow">
        {data.user.name ?? constants.FALLBACK_USER.NAME}
      </span>
    </>
  );
};

export default UserInfoHeader;
