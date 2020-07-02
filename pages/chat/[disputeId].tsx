import React from 'react';
import { useRouter } from 'next/router';
import ChatBox from '../../components/ChatBox';
import withApollo from '../../utils/withApollo';

const ChatWithOpenDispute = (): JSX.Element => {
  const router = useRouter();
  const disputeId = Array.isArray(router.query.disputeId)
    ? router.query.disputeId[0]
    : router.query.disputeId;

  return <ChatBox selectedDisputeId={disputeId} />;
};

export default withApollo(ChatWithOpenDispute);
