import React from 'react';
import {
  useChatItemHeaderQuery,
  useEditSubjectTitleMutation,
} from '../../../../graphql/generated/frontend';
import useUser from '../../../../utils/react-hooks/useUser';
import ChatBoxHeader from './ChatBoxHeader';
import DisputeDropdown from './DisputeDropdown';
import EditableText from './EditableText';

interface ChatItemHeaderProps {
  chatItemId: string;
}

const ChatItemHeader = ({ chatItemId }: ChatItemHeaderProps): JSX.Element => {
  const { data } = useChatItemHeaderQuery({
    variables: { chatItemId },
    pollInterval: 60 * 1000,
  });
  const [editSubjectTitle] = useEditSubjectTitleMutation();
  const user = useUser();

  const chatItem = data?.chatItem;

  const subject =
    chatItem?.__typename === 'Dispute'
      ? chatItem.subject
      : chatItem?.__typename === 'Subject'
      ? chatItem
      : undefined;

  const handleTitleUpdate = (title: string): void => {
    if (!subject) return;
    editSubjectTitle({
      variables: { subjectId: subject.id, title },
      optimisticResponse: {
        __typename: 'Mutation',
        editSubjectTitle: {
          __typename: 'Subject',
          id: subject.id,
          subject: title,
        },
      },
    });
  };

  return (
    <ChatBoxHeader>
      <>
        <div className="flex-grow truncate md:!ml-0" title={subject?.topic}>
          {!!subject && !!user && subject.author.id === user.twitterId ? (
            <EditableText
              key={subject.id}
              text={subject.topic}
              onUpdate={handleTitleUpdate}
            />
          ) : (
            subject?.topic
          )}
        </div>
        {subject ? (
          <DisputeDropdown subject={subject} selectedChatItem={chatItemId} />
        ) : null}
      </>
    </ChatBoxHeader>
  );
};

export default ChatItemHeader;
