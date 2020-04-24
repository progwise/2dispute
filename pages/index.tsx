import React from 'react';
import { useStartPageQuery } from '../graphql/generated/graphql';
import withApollo from '../utils/withApollo';
import Link from '../components/Link/Link';

const Home = (): JSX.Element => {
  const { called, loading, data, error } = useStartPageQuery();

  if (!called || (loading && !data)) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
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
      <div className="py-4">
        <h1>Aktuelle Dispute:</h1>
        <ul className="list-disc pl-8">
          {data.latestActiveDisputes.edges.map(({ node: dispute }) => (
            <Link
              key={dispute.id}
              href="/dispute/[disputeId]"
              as={`/dispute/${dispute.id}`}
            >
              <li>
                {dispute.subject.subject} (Dispute zwischen{' '}
                {dispute.partnerA.name} und {dispute.partnerB.name})
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="py-4">
        <h1>Unbeantwortete Themen:</h1>
        <ul className="list-disc pl-8">
          {data.unansweredSubjects.edges.map(({ node: subject }) => (
            <Link
              key={subject.id}
              href="/subjects/[subjectId]"
              as={`/subjects/${subject.id}`}
            >
              <li>
                {subject.subject} von {subject.author.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default withApollo(Home);
