import { SubjectResolvers } from '../generated/graphql';
import { getUserById } from '../User';

const subjectResolvers: SubjectResolvers = {
  author: parent => getUserById(parent.userId),
  firstMessage: parent => ({
    id: parent.id,
    authorId: parent.userId,
    text: parent.firstMessage,
  }),
};

export default subjectResolvers;
