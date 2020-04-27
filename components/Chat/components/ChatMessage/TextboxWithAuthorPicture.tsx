import React from 'react';

interface TextboxWithAuthorPictureProps {
  authorPicture: string;
  position: 'left' | 'right';
  children: React.ReactNode;
}

const TextboxWithAuthorPicture = ({
  authorPicture,
  children,
  position,
}: TextboxWithAuthorPictureProps): JSX.Element => (
  <div className={`w-full flex flex-col items-center`}>
    <img
      src={authorPicture ?? ''}
      className="rounded-full w-32 h-32 -mb-8 z-10"
    />
    <div
      className={`${
        position === 'left' ? 'bg-orange-200' : 'bg-blue-200'
      } w-full p-12 min-h-48`}
    >
      {children}
    </div>
  </div>
);

export default TextboxWithAuthorPicture;
