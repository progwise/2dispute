/* eslint-disable @typescript-eslint/no-empty-function */

import React, { useContext, createContext, useState } from 'react';

const SelectedChatItem = createContext<
  [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]
>([undefined, (): void => {}]);

export const SelectedChatItemProvider = (props): JSX.Element => {
  const state = useState<string | undefined>(undefined);
  return <SelectedChatItem.Provider value={state} {...props} />;
};

export const useSelectedChatItem = (): string | undefined => {
  const [selectedChatItem] = useContext(SelectedChatItem);
  return selectedChatItem;
};

export const useSetSelectedChatItem = (): React.Dispatch<
  React.SetStateAction<string | undefined>
> => {
  const [, setSelectedChatItem] = useContext(SelectedChatItem);
  return setSelectedChatItem;
};
