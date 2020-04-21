import { SubjectResolvers } from '../generated/graphql';

const subjectResolvers: SubjectResolvers = {
  id: parent => parent._id,
  author: (parent, _args, context) =>
    context.dataloaders.userDataloader.load(parent.userId),
  firstMessage: parent => ({
    _id: parent._id,
    authorId: parent.userId,
    text: parent.firstMessage,
    createdAt: parent.createdAt,
  }),
};

export default subjectResolvers;
