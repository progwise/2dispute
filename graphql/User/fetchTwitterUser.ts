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

    // The normal picture has a size of 48x48. In 2 dispute we display profile
    // pictures as 128x128. Therefore we are loading the next bigger available
    // size, which is 200x200.
    const pictureNormal: string = userResult.profile_image_url_https;
    const picture200 = pictureNormal.replace('_normal.', '_200x200.');

    return {
      id: userId,
      name: userResult.name,
      twitterHandle: userResult.screen_name,
      picture: picture200,
    };
  } catch {
    return {
      id: userId,
      name: 'User not found',
      twitterHandle: '',
    };
  }
};

export default fetchTwitterUser;
