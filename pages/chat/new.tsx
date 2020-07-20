import React from 'react';
import withApollo from '../../utils/withApollo';
import ChatBox from '../../components/ChatBox';

const NewSubjectPage = (): JSX.Element => <ChatBox showNewSubjectForm />;

export default withApollo(NewSubjectPage);
