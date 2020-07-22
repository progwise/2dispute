import mongoose from 'mongoose';

export const user1 = {
  _id: mongoose.Types.ObjectId('00507794bd37b4e4b4a79c55'),
  expire: new Date(Date.now() + 1000 * 60 * 60),
  key: 'twitter_user_1',
  value: {
    id: '1',
    name: 'User name',
    twitterHandle: 'twitterHandle',
    picture: null,
  },
};
