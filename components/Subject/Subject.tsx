import React from 'react';
import { useGetSubjectQuery } from '../../graphql/generated/frontend';
import SubjectPresentation from './SubjectPresentation';

interface SubjectProps {
  subjectId: string;
}

const Subject = ({ subjectId }: SubjectProps): JSX.Element => {
  const { called, loading, error, data } = useGetSubjectQuery({
    variables: { subjectId },
  });

  if (!called || loading) {
    return <p>Loading...</p>;
  }

  if (error || !data?.subject) {
    return (
      <p>
        Fehler
        <br />
        {JSON.stringify(error)}
      </p>
    );
  }

  return (
    <SubjectPresentation subject={data.subject} me={data.me ?? undefined} />
  );
};

export default Subject;
