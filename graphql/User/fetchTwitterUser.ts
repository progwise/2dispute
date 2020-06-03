/* eslint-disable @typescript-eslint/camelcase */
import Twitter from 'twitter-lite';
import { UserMapper } from '.';

let twitterClient: Twitter;

const getTwitterClient = async (): Promise<Twitter> => {
  if (!twitterClient) {
    const bearerToken = await new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY ?? '',
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET ?? '',
    }).getBearerToken();

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    twitterClient = new Twitter({ bearer_token: bearerToken.access_token });
  }

  return twitterClient;
};

const fetchTwitterUser = async (userId: string): Promise<UserMapper> => {
  const client = await getTwitterClient();

  try {
    const userResult = await client.get('users/show', {
      user_id: userId,
      include_entities: false,
    });
    return {
      id: userId,
      name: userResult.name,
      picture: userResult.profile_image_url_https,
    };
  } catch {
    return {
      id: userId,
      name: 'User not found',
    };
  }
};

export default fetchTwitterUser;
