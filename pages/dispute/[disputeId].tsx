import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  useGetDisputeLazyQuery,
  useReplyOnDisputeMutation,
} from '../../graphql/generated/graphql';
import withApollo from '../../utils/withApollo';
import SubjectHeader from '../../components/Subject/SubjectHeader';
import { DisputeChat, ChatFormValues } from '../../components/Chat';
import Link from '../../components/Link/Link';

const Dispute = (): JSX.Element => {
  const router = useRouter();
  const disputeId = Array.isArray(router.query.disputeId)
    ? router.query.disputeId[0]
    : router.query.disputeId;

  const [
    loadDispute,
    { called, loading, data, error },
  ] = useGetDisputeLazyQuery({ pollInterval: 10 * 1000 });
  const [replyOnDispute] = useReplyOnDisputeMutation();

  const handleNewMessage = async (values: ChatFormValues): Promise<void> => {
    const { data, errors } = await replyOnDispute({
      variables: { disputeId, message: values.message },
    });

    if (errors || data === undefined) throw new Error('submit failed');
  };

  useEffect(() => {
    if (disputeId !== undefined) {
      loadDispute({ variables: { disputeId } });
    }
  }, [disputeId]);

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
                <Link href={`/dispute/${dispute.id}`}>
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

export default withApollo(Dispute);
