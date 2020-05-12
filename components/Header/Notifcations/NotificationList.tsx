import React from 'react';
import { Waypoint } from 'react-waypoint';
import { NotificationListQueryResult } from '../../../graphql/generated/graphql';
import NotificationListItem from './NotificationListItem';

interface NotificationListProps {
  notificationListQueryResult: NotificationListQueryResult;
}

const NotificationList = ({
  notificationListQueryResult,
}: NotificationListProps): JSX.Element => {
  const { data, loading, error, fetchMore } = notificationListQueryResult;

  if (error) {
    return <div className="p-4">Fehler: {JSON.stringify(error)}</div>;
  }

  const handleFetchMore = async (): Promise<void> => {
    if (!data?.allNotifications) {
      return;
    }

    await fetchMore({
      variables: { after: data.allNotifications?.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult?.allNotifications?.edges;
        const pageInfo = fetchMoreResult?.allNotifications?.pageInfo;

        return newEdges?.length
          ? {
              notificationStatus: fetchMoreResult?.notificationStatus,
              allNotifications: {
                ...prevResult.allNotifications,
                edges: [
                  ...(prevResult.allNotifications?.edges ?? []),
                  ...newEdges,
                ],
                pageInfo: {
                  ...prevResult.allNotifications?.pageInfo,
                  hasNextPage: pageInfo?.hasNextPage,
                  endCursor: pageInfo?.endCursor,
                },
              },
            }
          : prevResult;
      },
    });
  };

  if (!data?.allNotifications) {
    if (loading) {
      return <span>Loading...</span>;
    } else {
      return <span>Nicht angemeldet</span>;
    }
  }

  return (
    <>
      {data.allNotifications?.totalCount === 0 && (
        <div className="p-4">Es existieren noch keine Benachrichtigungen</div>
      )}
      {data.allNotifications.edges.map(({ node: notification }) => {
        switch (notification.__typename) {
          case 'NewDisputeNotification': {
            const user = notification.dispute.partnerB;
            return (
              <NotificationListItem
                key={notification.id}
                createdAt={notification.createdAt}
                read={notification.read}
                picture={user.picture ?? ''}
                link={{
                  href: '/dispute/[disputeId]',
                  as: `/dispute/${notification.dispute.id}`,
                }}
              >
                {user.name} hat einen Dispute mit dir gestartet
              </NotificationListItem>
            );
          }
          case 'NewMessageNotification': {
            const user = notification.message.author;
            return (
              <NotificationListItem
                key={notification.id}
                createdAt={notification.createdAt}
                read={notification.read}
                picture={user.picture ?? ''}
                link={{
                  href: '/dispute/[disputeId]',
                  as: `/dispute/${notification.message.dispute.id}`,
                }}
              >
                {user.name} hat dir geantwortet
              </NotificationListItem>
            );
          }
          default:
            return;
        }
      })}
      {data.allNotifications.pageInfo.hasNextPage && !loading && (
        <Waypoint onEnter={handleFetchMore} bottomOffset="-100px" />
      )}

      {loading && <span>Loading...</span>}
    </>
  );
};

export default NotificationList;
