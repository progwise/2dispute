import React from 'react';
import withApollo from '../../utils/withApollo';
import { useGetAllSubjectsQuery } from '../../graphql/generated/graphql';
import Link from '../../components/Link/Link';
import Button from '../../components/Button/Button';

const Subjects = (): JSX.Element => {
  const { called, loading, data, error, fetchMore } = useGetAllSubjectsQuery({
    notifyOnNetworkStatusChange: true,
  });

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

  const handleFetchMoreClick = (): void => {
    fetchMore({
      variables: {
        cursor: data.allSubjects.pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult?.allSubjects.edges;
        const pageInfo = fetchMoreResult?.allSubjects.pageInfo;

        return newEdges?.length
          ? {
              allSubjects: {
                ...prevResult.allSubjects,
                edges: [...prevResult.allSubjects.edges, ...newEdges],
                pageInfo,
              },
            }
          : prevResult;
      },
    });
  };

  return (
    <>
      <h1>Alle Themen</h1>
      <ul className="list-disc pl-8">
        {data.allSubjects.edges.map(({ node: subject }) => (
          <li key={subject.id}>
            <Link href="/subjects/[subjectId]" as={`/subjects/${subject.id}`}>
              {subject.subject} von {subject.author.name}
            </Link>
            <ul className="list-disc pl-8">
              {subject.disputes.map(dispute => (
                <li key={dispute.id}>
                  <Link
                    href="/dispute/[disputeId]"
                    as={`/dispute/${dispute.id}`}
                  >
                    Disput mit {dispute.partnerB.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {data.allSubjects.pageInfo.hasNextPage && (
        <Button disabled={loading} onClick={handleFetchMoreClick}>
          mehr Themen laden
        </Button>
      )}
    </>
  );
};

export default withApollo(Subjects);
