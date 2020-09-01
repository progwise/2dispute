import React from 'react';
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

const New = (): JSX.Element => (
  <CreateSubjectProvider>
    <>
      <Seo title="Neues Thema erstellen" />
      <ChatBoxHeader>
        <Input
          className="flex-grow md:!ml-0"
          name="subject"
          placeholder="Neues Thema"
        />
      </ChatBoxHeader>
      <ChatBoxRightSideContent>
        <CreateSubjectForm />
      </ChatBoxRightSideContent>
    </>
  </CreateSubjectProvider>
);

export default New;
