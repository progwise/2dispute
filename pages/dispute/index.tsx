import React from 'react';
import { useGetAllDisputesQuery } from '../../graphql/generated/graphql';
import withApollo from '../../utils/withApollo';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';

const DisputeIndex = (): JSX.Element => {
  const { called, loading, data, error, fetchMore } = useGetAllDisputesQuery({
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
        cursor: data.allDisputes.pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult?.allDisputes.edges;
        const pageInfo = fetchMoreResult?.allDisputes.pageInfo;

        return newEdges?.length
          ? {
              allDisputes: {
                ...prevResult.allDisputes,
                edges: [...prevResult.allDisputes.edges, ...newEdges],
                pageInfo,
              },
            }
          : prevResult;
      },
    });
  };

  return (
    <>
      <h1>Alle Dispute</h1>
      <ul className="list-disc pl-8">
        {data.allDisputes.edges.map(({ node: dispute }) => (
          <li key={dispute.id}>
            <Link href="/dispute/[subjectId]" as={`/dispute/${dispute.id}`}>
              Disput zwischen {dispute.partnerA.name} und{' '}
              {dispute.partnerB.name} (Thema: {dispute.subject.subject})
            </Link>
          </li>
        ))}
      </ul>
      {data.allDisputes.pageInfo.hasNextPage && (
        <Button disabled={loading} onClick={handleFetchMoreClick}>
          mehr Dispute laden
        </Button>
      )}
    </>
  );
};

export default withApollo(DisputeIndex);
