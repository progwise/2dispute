import jwt from 'jsonwebtoken';

export default (token?: string): Date | undefined => {
  if (!token) {
    return;
  }

  const data = jwt.decode(token);
  if (!data || !data['iat']) {
    return;
  }

  return new Date(data['iat'] * 1000);
};
