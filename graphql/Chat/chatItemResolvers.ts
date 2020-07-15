import { ChatItemResolvers } from '../generated/backend';

const chatItemResolvers: ChatItemResolvers = {
  __resolveType: parent => {
    if ('disputes' in parent) {
      return 'Subject';
    }

    return 'Dispute';
  },
};

export default chatItemResolvers;
