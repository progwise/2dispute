import auth0 from '../../utils/auth0';
import { NextApiHandler } from 'next';

const login: NextApiHandler = async (req, res) => {
  try {
    await auth0(req).handleLogin(req, res, {
      redirectTo: 'https://progwise.net/',
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};

export default login;
