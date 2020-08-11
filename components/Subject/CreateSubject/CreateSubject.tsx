import React from 'react';
import { useRouter } from 'next/router';
import {
  useMeQuery,
  useCreateSubjectMutation,
} from '../../../graphql/generated/frontend';
import Loader from '../../ChatBox/ChatList/Loader';
import CreateSubjectForm, { FormSubmitValues } from './CreateSubjectForm';

const CreateSubject = (): JSX.Element | null => {
  const router = useRouter();
  const { data, loading, error } = useMeQuery();
  const [createSubject] = useCreateSubjectMutation();

  const handleSubmit = async (values: FormSubmitValues): Promise<void> => {
    const { data, errors } = await createSubject({
      variables: values,
      refetchQueries: ['ChatList'],
    });

    if (errors || !data) {
      throw new Error('submit failed');
    }

    const subjectId = data.createSubject.id;

    router.push({ pathname: '/', query: { chatId: subjectId } });
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <p>Fehler: {JSON.stringify(error)}</p>;
  }

  if (!data.me) {
    router.push(`/api/auth/twitter?redirectTo=${router.asPath}`);
    return null;
  }

  return <CreateSubjectForm handleSubmit={handleSubmit} user={data.me} />;
};

export default CreateSubject;
