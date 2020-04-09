import auth0 from '../../utils/auth0';
import { NextApiHandler } from 'next';

const me: NextApiHandler = async (req, res) => {
  try {
    await auth0(req).handleProfile(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default me;
