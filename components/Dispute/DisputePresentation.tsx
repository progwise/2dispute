import React from 'react';
import {
  DisputeFragment,
  useReplyOnDisputeMutation,
  ChatPersonFragment,
} from '../../graphql/generated/frontend';
import SubjectHeader from '../Subject/SubjectHeader';
import { DisputeChat, ChatFormValues } from '../Chat';
import Link from '../Link/Link';
import Seo from '../Seo';

interface DisputePresentationProps {
  dispute: DisputeFragment;
  me?: ChatPersonFragment;
  onNewMessage?: () => Promise<void>;
}

const DisputePresentation = ({
  dispute,
  me,
  onNewMessage,
}: DisputePresentationProps): JSX.Element => {
  const [replyOnDispute] = useReplyOnDisputeMutation();

  const handleNewMessage = async (values: ChatFormValues): Promise<void> => {
    const { data, errors } = await replyOnDispute({
      variables: { disputeId: dispute.id, message: values.message },
    });

    if (errors || data === undefined) throw new Error('submit failed');

    // Normally the cache should update the list.
    // But there is a bug: https://github.com/apollographql/react-apollo/issues/3816
    if (onNewMessage) {
      await onNewMessage();
    }
  };

  const otherDisputesOfSubject = dispute.subject.disputes.filter(
    d => d.id !== dispute.id,
  );

  return (
    <>
      <Seo
        title={`Dispute ${dispute.partnerA.name} vs. ${dispute.partnerB.name}`}
      />
      <SubjectHeader
        subject={dispute.subject.subject}
        tweetId={dispute.subject.tweetId ?? undefined}
      />
      <DisputeChat dispute={dispute} me={me} onNewMessage={handleNewMessage} />
      <div>
        Andere Dispute zu diesem Thema:
        {otherDisputesOfSubject.length === 0 ? (
          'Es existieren keine weiteren Dispute zu diesem Thema'
        ) : (
          <ul className="list-disc pl-8">
            {otherDisputesOfSubject.map(dispute => (
              <li key={dispute.id}>
                <Link href="/dispute/[disputeId]" as={`/dispute/${dispute.id}`}>
                  Disput zwischen {dispute.partnerA.name} und{' '}
                  {dispute.partnerB.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DisputePresentation;
