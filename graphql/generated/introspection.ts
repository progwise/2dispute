export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}
const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'INTERFACE',
        name: 'Notification',
        possibleTypes: [
          {
            name: 'NewDisputeNotification',
          },
          {
            name: 'NewMessageNotification',
          },
        ],
      },
    ],
  },
};
export default result;
