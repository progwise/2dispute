import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import Layout from '../../Layout';
import {
  useNotificationListQuery,
  NotificationListQuery,
} from '../../../graphql/generated/frontend';
import useInterval from '../../../utils/react-hooks/useInterval';
import NotificationList from './NotificationList';

const Notifications = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const toggleOpen = (): void => setOpen(open => !open);

  const notificationListQuery = useNotificationListQuery({
    notifyOnNetworkStatusChange: true,
  });

  const fetchNewerNotification = async (): Promise<void> => {
    if (!notificationListQuery.data?.allNotifications) {
      return;
    }

    await notificationListQuery.fetchMore({
      variables: {
        before:
          notificationListQuery.data.allNotifications.pageInfo.startCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }): NotificationListQuery => {
        if (!prevResult.allNotifications) {
          return {
            ...prevResult,
            allNotifications: fetchMoreResult?.allNotifications,
          };
        }

        if (!fetchMoreResult?.allNotifications) {
          return prevResult;
        }

        const newEdges = fetchMoreResult.allNotifications.edges;
        const pageInfo = fetchMoreResult.allNotifications.pageInfo;

        return {
          ...prevResult,
          notificationStatus: fetchMoreResult.notificationStatus,
          allNotifications: {
            ...prevResult.allNotifications,
            totalCount: fetchMoreResult.allNotifications.totalCount,
            pageInfo:
              newEdges.length > 0
                ? {
                    ...prevResult.allNotifications.pageInfo,
                    startCursor: pageInfo.startCursor,
                  }
                : prevResult.allNotifications.pageInfo,
            edges: [...newEdges, ...prevResult.allNotifications.edges],
          },
        };
      },
    });
  };

  useInterval(() => {
    if (!notificationListQuery.data?.allNotifications) {
      return;
    }
    fetchNewerNotification();
  }, 60 * 1000);

  const totalCountUnread =
    notificationListQuery.data?.notificationStatus.totalCountUnread ?? 0;

  return (
    <div className="">
      <FaBell
        onClick={toggleOpen}
        className={`${
          totalCountUnread > 0 ? 'text-blue-600 font-bold' : ''
        } text-lg cursor-pointer`}
      />
      {open && (
        <>
          <div
            className="fixed inset-0 bg-gray-600 opacity-50 z-20"
            onClick={toggleOpen}
          />
          <div className="absolute inset-x-0 z-20" onClick={toggleOpen}>
            <Layout>
              <div className="flex justify-end">
                <div
                  className="max-w-md mt-4 max-h-lg overflow-scroll h-full w-full bg-white border-2 shadow-xl"
                  id="notificationList"
                >
                  <NotificationList
                    notificationListQueryResult={notificationListQuery}
                  />
                </div>
              </div>
            </Layout>
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
