import React from 'react';
import { useRouter } from 'next/router';
import withApollo from '../../utils/withApollo';
import {
  useCreateSubjectMutation,
  useMeQuery,
} from '../../graphql/generated/frontend';
import CreateSubjectForm, {
  FormSubmitValues,
} from '../../components/Subject/CreateSubjectForm';

interface FormValues {
  subject: string;
  tweetLink: string;
  firstMessage: string;
}

const CreateSubject = (): JSX.Element => {
  const [createSubject] = useCreateSubjectMutation();
  const { data, loading, error } = useMeQuery();
  const router = useRouter();

  const handleSubmit = async (values: FormSubmitValues): Promise<void> => {
    const { data, errors } = await createSubject({
      variables: values,
    });

    if (errors || !data) {
      throw new Error('submit failed');
    }

    const subjectId = data.createSubject.id;

    router.push('/subjects/[subjectId]', `/subjects/${subjectId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Fehler...</p>;
  }

  if (!data.me) {
    router.push(`/api/auth/twitter?redirectTo=${router.asPath}`);
    return <p>Loading...</p>;
  }

  return <CreateSubjectForm handleSubmit={handleSubmit} user={data.me} />;
};

export default withApollo(CreateSubject);
