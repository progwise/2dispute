import React, { useState, useEffect } from 'react';
import UserContext, { UserInformations } from './UserContext';

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserInformations>({
    loading: true,
    isLoggedIn: false,
  });

  const fetchMe = async (): Promise<void> => {
    setUser(user => ({ ...user, loading: true }));

    try {
      const result = await fetch('/api/me');
      const userFromAuth0 = await result.json();

      setUser(user => ({
        ...user,
        loading: false,
        isLoggedIn: true,
        user: {
          nickname: userFromAuth0.nickname,
          picture: userFromAuth0.picture,
        },
      }));
    } catch (error) {
      setUser(user => ({
        ...user,
        loading: false,
        isLoggedIn: false,
      }));
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
