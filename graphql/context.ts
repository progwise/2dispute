import { Subject } from './generated/graphql';

export interface Context {
  subject: {
    getStore: () => Subject[];
    updateStore: (updatedStore: Subject[]) => void;
  };
}

let subjectStore: Subject[] = [];

const context: Context = {
  subject: {
    getStore: (): Subject[] => subjectStore,
    updateStore: (updatedStore): void => {
      subjectStore = updatedStore;
    },
  },
};

export default context;
