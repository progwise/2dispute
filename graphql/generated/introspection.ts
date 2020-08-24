export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}

const result: PossibleTypesResultData = {
  possibleTypes: {
    ChatItem: ['Subject', 'Dispute'],
  },
};

export default result;
