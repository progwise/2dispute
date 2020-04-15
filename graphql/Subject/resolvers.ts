import { SubjectResolvers } from '../generated/graphql';
import { getUserById } from '../User';

const subjectResolvers: SubjectResolvers = {
  author: parent => getUserById(parent.userId),
};

export default subjectResolvers;
