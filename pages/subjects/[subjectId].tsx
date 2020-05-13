import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from '../../components/Link/Link';
import {
  useGetSubjectLazyQuery,
  useReplyOnSubjectMutation,
} from '../../graphql/generated/frontend';
import withApollo from '../../utils/withApollo';
import SubjectHeader from '../../components/Subject/SubjectHeader';
import { SubjectChat, ChatFormValues } from '../../components/Chat';

const Subject = (): JSX.Element => {
  const router = useRouter();
  const subjectId = Array.isArray(router.query.subjectId)
    ? router.query.subjectId[0]
    : router.query.subjectId;

  const [
    loadSubject,
    { called, loading, data, error },
  ] = useGetSubjectLazyQuery();
  const [replyOnSubjectMutation] = useReplyOnSubjectMutation();

  const handleNewMessage = async (values: ChatFormValues): Promise<void> => {
    const { data, errors } = await replyOnSubjectMutation({
      variables: { subjectId, message: values.message },
    });

    if (errors || data === undefined) throw new Error('submit failed');

    const disputeId = data.replyOnSubject.id;
    router.push('/dispute/[disputeId]', `/dispute/${disputeId}`);
  };

  useEffect(() => {
    if (subjectId !== undefined) {
      loadSubject({
        variables: { subjectId },
      });
    }
  }, [subjectId]);

  if (!called || loading) {
    return <p>Loading...</p>;
  }

  if (error || !data?.subject) {
    return (
      <p>
        Fehler
        <br />
        {JSON.stringify(error)}
      </p>
    );
  }

  return (
    <>
      <SubjectHeader
        subject={data.subject.subject}
        tweetId={data.subject.tweetId ?? undefined}
      />
      <SubjectChat
        subject={data.subject}
        me={data.me}
        onNewMessage={handleNewMessage}
      />
      <div>
        Dispute zu diesem Thema:
        {data.subject.disputes.length === 0 ? (
          'Es existieren noch keine Dispute'
        ) : (
          <ul className="list-disc pl-8">
            {data.subject.disputes.map(dispute => (
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

export default withApollo(Subject);
