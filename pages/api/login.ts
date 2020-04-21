import auth0 from '../../utils/auth0';
import { NextApiHandler } from 'next';

const login: NextApiHandler = async (req, res) => {
  const redirectToParam = Array.isArray(req.query.redirectTo)
    ? req.query.redirectTo[0]
    : req.query.redirectTo;
  const redirectTo = redirectToParam ?? '/';

  try {
    await auth0(req).handleLogin(req, res, { redirectTo });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};

export default login;
