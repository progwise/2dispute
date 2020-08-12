import React from 'react';
import { UserInfoFragment } from '../../graphql/generated/frontend';
import Link from '../Link/Link';
import Seo from '../Seo';
import constants from '../../utils/constants';

interface UserInfoProps {
  user: UserInfoFragment;
}

const UserInfo = ({ user }: UserInfoProps): JSX.Element => {
  const userName = user.name ?? constants.FALLBACK_USER.NAME;
  const userPicture = user.picture ?? constants.FALLBACK_USER.PICTURE;

  return (
    <>
      <Seo title={userName} />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="md:col-span-2 flex flex-col items-center">
          <img src={userPicture} className="rounded-full mb-2 w-32 h-32" />
          <h1 className="text-2xl">{user.name}</h1>
        </div>
        <div>
          <h2 className="text-xl">Die letzten Dispute</h2>
          <ul className="list-disc pl-8">
            {user.allDisputes.edges.map(({ node: dispute }) => {
              const userA =
                dispute.partnerA.name ?? constants.FALLBACK_USER.NAME;
              const userB =
                dispute.partnerB.name ?? constants.FALLBACK_USER.NAME;
              return (
                <li key={dispute.id}>
                  <Link
                    href="/dispute/[disputeId]"
                    as={`/dispute/${dispute.id}`}
                  >
                    {userA} vs {userB} (Thema: {dispute.subject.subject})
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="text-xl">Die letzten Themen</h2>
          <ul className="list-disc pl-8">
            {user.allSubjects.edges.map(({ node: subject }) => (
              <li key={subject.id}>
                <Link
                  href="/subjects/[subjectId]"
                  as={`/subjects/${subject.id}`}
                >
                  {subject.subject}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
