import { SubjectResolvers } from '../generated/graphql';

const subjectResolvers: SubjectResolvers = {
  author: (parent, _args, context) =>
    context.dataloaders.userDataloader.load(parent.userId),
  firstMessage: parent => ({
    id: parent.id,
    authorId: parent.userId,
    text: parent.firstMessage,
  }),
};

export default subjectResolvers;
