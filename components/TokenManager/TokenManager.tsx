import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import constants from '../../utils/constants';
import getTokenCreationDate from './getTokenCreationDate';

const ONE_HOUR_IN_MS = 1000 * 60 * 60;
const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

const TokenManager = (): JSX.Element => {
  const [token, setToken] = useState(Cookies.get(constants.COOKIE_TOKEN_KEY));

  const renewToken = async (): Promise<void> => {
    try {
      await fetch('/api/auth/renew');
      const newToken = Cookies.get(constants.COOKIE_TOKEN_KEY);
      if (token === newToken) {
        throw new Error('token not updated');
      }
      setToken(newToken);
    } catch {
      // token renewing failed, retry in 5 minutes
      setTimeout(renewToken, FIVE_MINUTES_IN_MS);
    }
  };

  useEffect(() => {
    const tokenCreatedAt = getTokenCreationDate(token);
    const now = new Date();

    if (tokenCreatedAt) {
      const renewDate = new Date(tokenCreatedAt.getTime() + ONE_HOUR_IN_MS);
      const timeDiff = renewDate.getTime() - now.getTime();

      const timer = setTimeout(renewToken, timeDiff);
      return (): void => clearTimeout(timer);
    }
  }, [token]);

  return <React.Fragment />;
};

export default TokenManager;
