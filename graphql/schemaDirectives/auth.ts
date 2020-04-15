import {
  SchemaDirectiveVisitor,
  AuthenticationError,
} from 'apollo-server-micro';
import { GraphQLField, defaultFieldResolver } from 'graphql';
import { Context } from '../context';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<unknown, unknown>): void {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (
      ...args: [unknown, unknown, Context]
    ): Promise<unknown> => {
      const [, , context] = args;

      if (context.user === undefined) {
        throw new AuthenticationError('not authenticated');
      }

      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
