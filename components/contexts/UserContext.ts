import { createContext } from 'react';

export interface UserInformations {
  loading: boolean;
  isLoggedIn: boolean;
  user?: {
    nickname: string;
    picture: string;
  };
}
export default createContext<UserInformations>({
  isLoggedIn: false,
  loading: false,
});
