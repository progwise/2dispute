import React, { useEffect } from 'react';
import {
  useGetDisputeQuery,
  useClearNotificationsForDisputeMutation,
} from '../../graphql/generated/frontend';
import DisputePresentation from './DisputePresentation';

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
  });

  const handleNewMessage = async (): Promise<void> => {
    await refetch();
  };

  useEffect(() => {
    if (data?.dispute?.messages.length) {
      clearNotifications();
    }
  }, [data?.dispute?.messages.length]);

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
