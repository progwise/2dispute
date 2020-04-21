import server from '../../graphql';
import mongooseMiddleware from '../../graphql/mongoose';

export default mongooseMiddleware(
  server.createHandler({ path: '/api/graphql' }),
);

export const config = {
  api: {
    bodyParser: false,
  },
};
