import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export default abstract class ChatMessage {
  public abstract render(): JSX.Element;
  public abstract isEmpty(): boolean;
}

export class ChatMessageText extends ChatMessage {
  private _text: string;

  constructor(text: string) {
    super();
    this._text = text;
  }

  public render(): JSX.Element {
    return (
      <p>
        {this._text.split('\n').map((text, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {text}
          </React.Fragment>
        ))}
      </p>
    );
  }

  public isEmpty(): boolean {
    return this.text === '';
  }

  public get text(): string {
    return this._text;
  }
}

export class ChatMessageTweet extends ChatMessage {
  private _tweetId: string;

  constructor(tweetId: string) {
    super();
    this._tweetId = tweetId;
  }

  public render(): JSX.Element {
    return (
      <TwitterTweetEmbed
        tweetId={this._tweetId}
        placeholder="Lade Tweet..."
        options={{
          lang: 'de',
        }}
      />
    );
  }

  public isEmpty(): boolean {
    return this._tweetId === '';
  }
}
