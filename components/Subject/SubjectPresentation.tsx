import React from 'react';
import { useRouter } from 'next/router';
import {
  SubjectFragment,
  ChatPersonFragment,
  useReplyOnSubjectMutation,
} from '../../graphql/generated/frontend';
import { SubjectChat, ChatFormValues } from '../Chat';
import constants from '../../utils/constants';
import { useTranslation } from '../../utils/i18n';
import Seo from '../Seo';
import SubjectHeader from './SubjectHeader';

interface SubjectPresentationProps {
  subject: SubjectFragment;
  me?: ChatPersonFragment;
}

const SubjectPresentation = ({
  subject,
  me,
}: SubjectPresentationProps): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation();

  const [replyOnSubjectMutation] = useReplyOnSubjectMutation();

  const handleNewMessage = async (values: ChatFormValues): Promise<void> => {
    const { data, errors } = await replyOnSubjectMutation({
      variables: { subjectId: subject.id, message: values.message },
    });

    if (errors || !data) throw new Error('submit failed');

    const chatItemId = data.replyOnSubject.id;
    router.push('/[chatItemId]', `/${chatItemId}#form`);
  };

  const authorName = subject.author.name ?? constants.FALLBACK_USER.NAME;

  return (
    <>
      <Seo
        title={t('seo.title.subject', { topic: subject.topic, authorName })}
      />
      <SubjectHeader tweetId={subject.tweetId ?? undefined} />
      <SubjectChat subject={subject} me={me} onNewMessage={handleNewMessage} />
    </>
  );
};

export default SubjectPresentation;
