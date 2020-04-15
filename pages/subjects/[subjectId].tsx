import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useGetSubjectLazyQuery } from '../../graphql/generated/graphql';
import withApollo from '../../utils/withApollo';

const Subject = (): JSX.Element => {
  const router = useRouter();
  const { subjectId } = router.query;

  const [
    loadSubject,
    { called, loading, data, error },
  ] = useGetSubjectLazyQuery();

  useEffect(() => {
    if (subjectId !== undefined) {
      loadSubject({
        variables: {
          subjectId: Array.isArray(subjectId) ? subjectId[0] : subjectId,
        },
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
      <div className="w-full text-center py-2">
        <p className="text-blue-600">Das Thema</p>
        <p className="text-lg">{data.subject.subject}</p>
      </div>
      {data.subject.tweetId && (
        <div className="px-4 mx-auto">
          <TwitterTweetEmbed
            tweetId={data.subject.tweetId}
            key={data.subject.tweetId}
            placeholder="Lade Tweet..."
            className="mx-auto"
            options={{
              lang: 'de',
              align: 'center',
            }}
          />
        </div>
      )}
    </>
  );
};

export default withApollo(Subject);
