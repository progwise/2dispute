import React from 'react';
import { useChatItemQuery } from '../../../graphql/generated/frontend';
import DisputePresentation from '../../Dispute/DisputePresentation';
import SubjectPresentation from '../../Subject/SubjectPresentation';

interface ChatItemProps {
  chatItemId: string;
}

const ChatItem = ({ chatItemId }: ChatItemProps): JSX.Element => {
  const { data, loading, error, refetch } = useChatItemQuery({
    variables: { id: chatItemId },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data?.chatItem) {
    return (
      <p>
        Fehler
        <br />
        {JSON.stringify(error)}
      </p>
    );
  }

  const handleNewMessage = async (): Promise<void> => {
    await refetch();
  };

  switch (data.chatItem.__typename) {
    case 'Dispute':
      return (
        <DisputePresentation
          dispute={data.chatItem}
          me={data.me ?? undefined}
          onNewMessage={handleNewMessage}
        />
      );
    case 'Subject':
      return (
        <SubjectPresentation
          subject={data.chatItem}
          me={data.me ?? undefined}
        />
      );
    default:
      return <div>Typ wird nicht unterstützt</div>;
  }
};

export default ChatItem;
