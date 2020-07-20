export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}

const result: PossibleTypesResultData = {
  possibleTypes: {
    ChatItem: ['Subject', 'Dispute'],
    Notification: ['NewDisputeNotification', 'NewMessageNotification'],
  },
};

export default result;
