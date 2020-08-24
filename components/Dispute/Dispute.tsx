import React from 'react';
import { useGetDisputeQuery } from '../../graphql/generated/frontend';
import DisputePresentation from './DisputePresentation';

interface DisputeProps {
  disputeId: string;
}

const Dispute = ({ disputeId }: DisputeProps): JSX.Element => {
  const { called, data, loading, error, refetch } = useGetDisputeQuery({
    variables: { disputeId },
    pollInterval: 10 * 1000,
  });

  const handleNewMessage = async (): Promise<void> => {
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

  return (
    <DisputePresentation
      dispute={data.dispute}
      me={data.me ?? undefined}
      onNewMessage={handleNewMessage}
    />
  );
};

export default Dispute;
