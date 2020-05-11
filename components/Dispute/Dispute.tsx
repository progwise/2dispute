import React, { useEffect } from 'react';
import {
  useGetDisputeQuery,
  useReplyOnDisputeMutation,
  useClearNotificationsForDisputeMutation,
} from '../../graphql/generated/graphql';
import { ChatFormValues, DisputeChat } from '../Chat';
import SubjectHeader from '../Subject/SubjectHeader';
import Link from '../Link/Link';

interface DisputeProps {
  disputeId: string;
}

const Dispute = ({ disputeId }: DisputeProps): JSX.Element => {
  const { called, data, loading, error, refetch } = useGetDisputeQuery({
    variables: { disputeId },
    pollInterval: 10 * 1000,
  });

  const [clearNotifications] = useClearNotificationsForDisputeMutation({
    variables: { disputeId },
    refetchQueries: ['Notifications'],
  });

  useEffect(() => {
    if (data) {
      clearNotifications();
    }
  }, [data]);

  const [replyOnDispute] = useReplyOnDisputeMutation();

  const handleNewMessage = async (values: ChatFormValues): Promise<void> => {
    const { data, errors } = await replyOnDispute({
      variables: { disputeId, message: values.message },
    });

    if (errors || data === undefined) throw new Error('submit failed');

    // Normally the cache should update the list.
    // But there is a bug: https://github.com/apollographql/react-apollo/issues/3816
    await refetch();
  };

  if (!called || loading) {
    return <p>Loading...</p>;
  }

  if (error || !data?.dispute) {
    return (
      <p>
        Fehler
        <br />
        {JSON.stringify(error)}
      </p>
    );
  }

  const otherDisputesOfSubject = data.dispute.subject.disputes.filter(
    dispute => dispute.id !== disputeId,
  );

  return (
    <>
      <SubjectHeader
        subject={data.dispute.subject.subject}
        tweetId={data.dispute.subject.tweetId ?? undefined}
      />
      <DisputeChat
        dispute={data.dispute}
        me={data.me}
        onNewMessage={handleNewMessage}
      />
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

export default Dispute;
