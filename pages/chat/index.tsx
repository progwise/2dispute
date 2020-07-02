import React from 'react';
import withApollo from '../../utils/withApollo';
import ChatBox from '../../components/ChatBox';

const Chat = (): JSX.Element => <ChatBox />;

export default withApollo(Chat);
