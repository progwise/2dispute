import React from 'react';
import i18n from '../utils/i18n';
import {
  CreateSubjectProvider,
  CreateSubjectForm,
} from '../components/Subject/CreateSubject';
import Seo from '../components/Seo';
import { Input } from '../components/Input';
import {
  ChatBoxRightSideContent,
  ChatBoxHeader,
} from '../components/ChatBox/ChatBoxRightSide';

const New = (): JSX.Element => {
  const { t } = i18n.useTranslation();
  return (
    <CreateSubjectProvider>
      <>
        <Seo title={t('seo.title.newTopic')} />
        <ChatBoxHeader>
          <Input
            className="flex-grow md:!ml-0"
            name="subject"
            placeholder={t('chat.form.newTopic')}
          />
        </ChatBoxHeader>
        <ChatBoxRightSideContent>
          <CreateSubjectForm />
        </ChatBoxRightSideContent>
      </>
    </CreateSubjectProvider>
  );
};

New.getInitialProps = (): { [prop: string]: unknown } => ({
  namespacesRequired: ['common'],
});

export default New;
