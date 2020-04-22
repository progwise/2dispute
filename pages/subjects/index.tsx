import React from 'react';
import withApollo from '../../utils/withApollo';
import { useGetAllSubjectsQuery } from '../../graphql/generated/graphql';
import Link from '../../components/Link/Link';

const Subjects = (): JSX.Element => {
  const { called, loading, data, error } = useGetAllSubjectsQuery();

  if (!called || loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return (
      <p>
        Fehler
        <br />
        {JSON.stringify(error)}
      </p>
    );
  }

  return (
    <>
      <h1>Alle Themen</h1>
      <ul className="list-disc pl-8">
        {data.allSubjects.map(subject => (
          <li key={subject.id}>
            <Link href={`/subjects/${subject.id}`}>
              {subject.subject} von {subject.author.name}
            </Link>
            <ul className="list-disc pl-8">
              {subject.disputes.map(dispute => (
                <li key={dispute.id}>
                  <Link href={`/dispute/${dispute.id}`}>
                    Disput mit {dispute.partnerB.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default withApollo(Subjects);
