import React from 'react';
import Link from '../../../Link/Link';

interface TextboxWithAuthorPictureProps {
  authorPicture: string;
  authorId: string;
  position: 'left' | 'right';
  children: React.ReactNode;
}

const TextboxWithAuthorPicture = ({
  authorPicture,
  authorId,
  children,
  position,
}: TextboxWithAuthorPictureProps): JSX.Element => (
  <div className={`w-full flex flex-col items-center min-w-0`}>
    <Link
      className="-mb-8 z-10"
      href="/users/[userId]"
      as={`/users/${authorId}`}
    >
      <img src={authorPicture ?? ''} className="rounded-full w-32 h-32" />
    </Link>
    <div
      className={`${
        position === 'left' ? 'bg-orange-200' : 'bg-blue-200'
      } w-full p-12 sm:min-h-48 space-y-8`}
    >
      {children}
    </div>
  </div>
);

export default TextboxWithAuthorPicture;
