import React from 'react';
import { useRouter } from 'next/router';
import Dispute from '../../components/Dispute/Dispute';
import withApollo from '../../utils/withApollo';

const DisputePage = (): JSX.Element => {
  const router = useRouter();
  const disputeId = Array.isArray(router.query.disputeId)
    ? router.query.disputeId[0]
    : router.query.disputeId;

  if (disputeId === undefined) return <p>Loading...</p>;

  return <Dispute disputeId={disputeId} />;
};

export default withApollo(DisputePage);
