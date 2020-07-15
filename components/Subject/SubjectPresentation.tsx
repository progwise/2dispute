import React from 'react';
import { useRouter } from 'next/router';
import {
  SubjectFragment,
  ChatPersonFragment,
  useReplyOnSubjectMutation,
} from '../../graphql/generated/frontend';
import { SubjectChat, ChatFormValues } from '../Chat';
import Link from '../Link/Link';
import SubjectHeader from './SubjectHeader';

interface SubjectPresentationProps {
  subject: SubjectFragment;
  me?: ChatPersonFragment;
}

const SubjectPresentation = ({
  subject,
  me,
}: SubjectPresentationProps): JSX.Element => {
  const router = useRouter();

  const [replyOnSubjectMutation] = useReplyOnSubjectMutation();

  const handleNewMessage = async (values: ChatFormValues): Promise<void> => {
    const { data, errors } = await replyOnSubjectMutation({
      variables: { subjectId: subject.id, message: values.message },
    });

    if (errors || data === undefined) throw new Error('submit failed');

    const chatItemId = data.replyOnSubject.id;
    router.push('/chat/[chatItemId]', `/chat/${chatItemId}`);
  };

  return (
    <>
      <SubjectHeader
        subject={subject.topic}
        tweetId={subject.tweetId ?? undefined}
      />
      <SubjectChat subject={subject} me={me} onNewMessage={handleNewMessage} />
      <div>
        Dispute zu diesem Thema:
        {subject.disputes.length === 0 ? (
          'Es existieren noch keine Dispute'
        ) : (
          <ul className="list-disc pl-8">
            {subject.disputes.map(dispute => (
              <li key={dispute.id}>
                <Link href="/dispute/[disputeId]" as={`/dispute/${dispute.id}`}>
                  Disput mit {dispute.partnerB.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SubjectPresentation;
