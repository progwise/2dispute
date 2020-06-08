import { NextApiHandler } from 'next';
import { deleteCookie } from '../../../utils/cookie';
import constants from '../../../utils/constants';

const logoutHandler: NextApiHandler = (req, res) => {
  deleteCookie(res, constants.COOKIE_TOKEN_KEY);

  res.statusCode = 302;
  res.setHeader('Location', '/');
  res.end();
};

export default logoutHandler;
