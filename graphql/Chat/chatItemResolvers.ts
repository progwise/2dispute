import { ChatItemResolvers } from '../generated/backend';

const chatItemResolvers: ChatItemResolvers = {
  __resolveType: parent => {
    if (Object.prototype.hasOwnProperty.call(parent, 'disputes')) {
      return 'Subject';
    }

    return 'Dispute';
  },
};

export default chatItemResolvers;
