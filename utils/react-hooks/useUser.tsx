import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import React, { useEffect, useState, createContext, useContext } from 'react';
import constants from '../constants';
import { UserDocument } from '../../graphql/User/UserSchema';
import useInterval from './useInterval';

const getTokenFromCookie = (): string | undefined =>
  Cookie.get(constants.COOKIE_TOKEN_KEY);

const getUserFromToken = (token: string): UserDocument | null => {
  try {
    return jwt.decode(token) as never;
  } catch (err) {
    return null;
  }
};

const UserContext = createContext<UserDocument | null>(null);

export const UserProvider = (props): JSX.Element => {
  const [token, setToken] = useState(getTokenFromCookie());
  const [user, setUser] = useState(token ? getUserFromToken(token) : null);

  useInterval(() => setToken(getTokenFromCookie()), 60 * 1000);

  useEffect(() => {
    if (token) {
      const newUser = getUserFromToken(token);
      setUser(newUser);
    }
  }, [token]);

  return <UserContext.Provider value={user} {...props} />;
};

const useUser = (): UserDocument | null => useContext(UserContext);

export default useUser;
