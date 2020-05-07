import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import Layout from '../../Layout';
import NotificationList from './NotificationList';

const totalCountUnread = 1;

const Notifications = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const toggleOpen = (): void => setOpen(open => !open);

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
                  <NotificationList />
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
