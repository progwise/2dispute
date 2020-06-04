import { NextApiHandler } from 'next';
import { deleteCookie } from '../../../utils/cookie';

const logoutHandler: NextApiHandler = (req, res) => {
  deleteCookie(res, 'token');

  res.statusCode = 302;
  res.setHeader('Location', '/');
  res.end();
};

export default logoutHandler;
