/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useContext, useEffect } from 'react';

const DisplayChatListOnSmallDevicesContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, (): void => {}]);

export const DisplayChatListOnSmallDevicesProvider = (props): JSX.Element => {
  const state = useState(false);
  return (
    <DisplayChatListOnSmallDevicesContext.Provider value={state} {...props} />
  );
};

export default (): boolean => {
  const [displayChatListOnSmallDevices] = useContext(
    DisplayChatListOnSmallDevicesContext,
  );
  return displayChatListOnSmallDevices;
};

export const setDisplayChatListOnSmallDevices = (): void => {
  const [, setDisplayChatListOnSmallDevices] = useContext(
    DisplayChatListOnSmallDevicesContext,
  );
  useEffect(() => {
    setDisplayChatListOnSmallDevices(true);
    return (): void => setDisplayChatListOnSmallDevices(false);
  }, [setDisplayChatListOnSmallDevices]);
};
