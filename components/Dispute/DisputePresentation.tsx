import React from 'react';
import {
  DisputeFragment,
  useReplyOnDisputeMutation,
  ChatPersonFragment,
} from '../../graphql/generated/frontend';
import i18n from '../../utils/i18n';
import SubjectHeader from '../Subject/SubjectHeader';
import { DisputeChat, ChatFormValues } from '../Chat';
import Seo from '../Seo';
import constants from '../../utils/constants';

interface DisputePresentationProps {
  dispute: DisputeFragment;
  me?: ChatPersonFragment;
  onNewMessage?: () => Promise<void>;
}

const DisputePresentation = ({
  dispute,
  me,
  onNewMessage,
}: DisputePresentationProps): JSX.Element => {
  const { t } = i18n.useTranslation();
  const [replyOnDispute] = useReplyOnDisputeMutation();

  const handleNewMessage = async (values: ChatFormValues): Promise<void> => {
    const { data, errors } = await replyOnDispute({
      variables: { disputeId: dispute.id, message: values.message },
    });

    if (errors || data === undefined) throw new Error('submit failed');

    // Normally the cache should update the list.
    // But there is a bug: https://github.com/apollographql/react-apollo/issues/3816
    if (onNewMessage) {
      await onNewMessage();
    }
  };

  const partnerAName = dispute.partnerA.name ?? constants.FALLBACK_USER.NAME;
  const partnerBName = dispute.partnerB.name ?? constants.FALLBACK_USER.NAME;

  return (
    <>
      <Seo title={t('seo.title.dispute', { partnerAName, partnerBName })} />
      <SubjectHeader tweetId={dispute.subject.tweetId ?? undefined} />
      <DisputeChat dispute={dispute} me={me} onNewMessage={handleNewMessage} />
    </>
  );
};

export default DisputePresentation;
