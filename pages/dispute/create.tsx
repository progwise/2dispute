import React, { useState } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const CreateDispute = (): JSX.Element => {
  const [tweetId, setTweetId] = useState<string>(undefined);

  const handleTweetChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const twitterLink = event.target.value;

    const twitterRegex = /twitter\.com\/(?:\w+)\/status(?:es)?\/(\d+)/i;
    const [, foundTweetId] = twitterLink.match(twitterRegex) ?? [
      undefined,
      undefined,
    ];
    setTweetId(foundTweetId);
  };

  return (
    <>
      <h1 className="text-xl text-center py-4">Create a Dispute</h1>
      <div>
        <Input label="Das Thema" placeholder="Neues Thema" />
        <Input
          label="Twitter Link"
          placeholder="https://twitter.com/..."
          onChange={handleTweetChange}
        />
        {tweetId && (
          <div className="px-4 mx-auto">
            <TwitterTweetEmbed
              tweetId={tweetId}
              key={tweetId}
              placeholder="Lade Tweet..."
              className="mx-auto"
              options={{
                lang: 'de',
                align: 'center',
              }}
            />
          </div>
        )}
        <div className="grid grid-cols-4">
          <div className="col-span-2 flex flex-col items-center py-4">
            <img
              src="https://www.progwise.net/static/c7930b51fec4d6e53d183f2cefd721e7/9af95/michael-vogt.jpg"
              className="rounded-full w-32"
            />
            <span>Du</span>
          </div>
          <div className="col-span-2 flex flex-col items-center py-4">
            <img
              src="https://www.progwise.net/static/95ed2645d74a2c245115ee4b1b2dc864/9af95/pascal-helbig.jpg"
              className="rounded-full w-32"
            />
            <span>???</span>
          </div>
          <textarea
            className="col-start-1 col-span-3 border-2"
            placeholder="Deine Position"
          ></textarea>
        </div>
      </div>
      <div className="py-4">
        <Button>Veröffentlichen</Button>
      </div>
    </>
  );
};

export default CreateDispute;
