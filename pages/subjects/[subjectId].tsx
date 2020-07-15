import React from 'react';
import { useRouter } from 'next/router';
import withApollo from '../../utils/withApollo';
import Subject from '../../components/Subject';

const SubjectPage = (): JSX.Element => {
  const router = useRouter();
  const subjectId = Array.isArray(router.query.subjectId)
    ? router.query.subjectId[0]
    : router.query.subjectId;

  if (subjectId === undefined) return <p>Loading...</p>;

  return <Subject subjectId={subjectId} />;
};

export default withApollo(SubjectPage);
