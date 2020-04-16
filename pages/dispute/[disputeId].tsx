import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useFormik } from 'formik';
import {
  useGetDisputeLazyQuery,
  useReplyOnDisputeMutation,
} from '../../graphql/generated/graphql';
import withApollo from '../../utils/withApollo';
import Button from '../../components/Button/Button';

enum UserState {
  PartnerA,
  PartnerB,
  Visitor,
}
interface FormValues {
  message: string;
}

const Dispute = (): JSX.Element => {
  const router = useRouter();
  const disputeId = Array.isArray(router.query.disputeId)
    ? router.query.disputeId[0]
    : router.query.disputeId;

  const [
    loadDispute,
    { called, loading, data, error },
  ] = useGetDisputeLazyQuery();
  const [replyOnDispute] = useReplyOnDisputeMutation();

  const formik = useFormik<FormValues>({
    initialValues: { message: '' },
    onSubmit: async values => {
      const { data, errors } = await replyOnDispute({
        variables: { disputeId, message: values.message },
      });

      if (errors || data === undefined) throw new Error('submit failed');
    },
  });

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

  let userState: UserState;
  switch (data.me?.id) {
    case data.dispute.partnerA.id:
      userState = UserState.PartnerA;
      break;
    case data.dispute.partnerB.id:
      userState = UserState.PartnerB;
      break;
    default:
      userState = UserState.Visitor;
  }

  return (
    <>
      <div className="w-full text-center py-2">
        <p className="text-blue-600">Das Thema</p>
        <p className="text-lg">{data.dispute.subject.subject}</p>
      </div>
      {data.dispute.subject.tweetId && (
        <div className="px-4 mx-auto">
          <TwitterTweetEmbed
            tweetId={data.dispute.subject.tweetId}
            key={data.dispute.subject.tweetId}
            placeholder="Lade Tweet..."
            className="mx-auto"
            options={{
              lang: 'de',
              align: 'center',
            }}
          />
        </div>
      )}
      <div className="grid grid-cols-4">
        {[data.dispute.partnerA, data.dispute.partnerB].map(partner => (
          <div
            className="col-span-2 flex flex-col items-center py-4"
            key={partner.id}
          >
            {partner.picture ? (
              <img src={partner.picture} className="rounded-full" />
            ) : (
              <span className="rounded-full h-32 w-32" />
            )}
            <span>{partner.name}</span>
          </div>
        ))}
        {data.dispute.messages.map(message => {
          const isMessageFromA =
            data.dispute?.partnerA.id === message.author.id;

          return (
            <div
              key={message.id}
              className={`${
                isMessageFromA ? 'col-start-1' : 'col-start-2'
              } col-span-3 border-2`}
            >
              {message.text}
            </div>
          );
        })}
        {userState !== UserState.Visitor && (
          <form
            className={`${
              userState === UserState.PartnerA ? 'col-start-1' : 'col-start2'
            } col-span-3`}
            onSubmit={formik.handleSubmit}
          >
            <textarea
              name="message"
              className="w-full border-2"
              placeholder="Deine Antwort"
              onChange={formik.handleChange}
              value={formik.values.message}
            ></textarea>
            <Button type="submit">Antworten</Button>
          </form>
        )}
      </div>
    </>
  );
};

export default withApollo(Dispute);
