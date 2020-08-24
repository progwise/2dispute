import React from 'react';
import Link from '../../Link/Link';
import LogoSVG from './Logo.svg';

const ChatBoxRightSideEmpty = (): JSX.Element => (
  <div className="flex flex-col h-full items-center justify-center space-y-4">
    <img src={LogoSVG} className="w-24 h-24" />
    <p className="text-center">
      Wähle ein Dispute aus der linken Liste aus oder{' '}
      <Link
        href={{ pathname: '/', query: { new: '' } }}
        className="whitespace-no-wrap"
      >
        erstelle ein neuen
      </Link>
      .
    </p>
  </div>
);

export default ChatBoxRightSideEmpty;
