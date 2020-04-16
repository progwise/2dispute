import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  useGetSubjectLazyQuery,
  useReplyOnSubjectMutation,
} from '../../graphql/generated/graphql';
import withApollo from '../../utils/withApollo';
import Button from '../../components/Button/Button';
import { useFormik } from 'formik';
import SubjectHeader from '../../components/Subject/SubjectHeader';

enum UserState {
  SubjectAuthor,
  Visitor,
  Unauthenticated,
}

interface FormValues {
  message: string;
}

const Subject = (): JSX.Element => {
  const router = useRouter();
  const subjectId = Array.isArray(router.query.subjectId)
    ? router.query.subjectId[0]
    : router.query.subjectId;

  const [
    loadSubject,
    { called, loading, data, error },
  ] = useGetSubjectLazyQuery();
  const [replyOnSubjectMutation] = useReplyOnSubjectMutation();

  const formik = useFormik<FormValues>({
    initialValues: { message: '' },
    onSubmit: async values => {
      const { data, errors } = await replyOnSubjectMutation({
        variables: { subjectId, message: values.message },
      });

      if (errors || data === undefined) throw new Error('submit failed');

      const disputeId = data.replyOnSubject.id;
      router.push(`/dispute/${disputeId}`);
    },
  });

  useEffect(() => {
    if (subjectId !== undefined) {
      loadSubject({
        variables: { subjectId },
      });
    }
  }, [subjectId]);

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

  const userState: UserState = data.me
    ? data.me.id === data.subject.author.id
      ? UserState.SubjectAuthor
      : UserState.Visitor
    : UserState.Unauthenticated;

  return (
    <>
      <SubjectHeader
        subject={data.subject.subject}
        tweetId={data.subject.tweetId ?? undefined}
      />
      <div className="grid grid-cols-4">
        <div className="col-span-2 flex flex-col items-center py-4">
          {data.subject.author.picture && (
            <img src={data.subject.author.picture} className="rounded-full" />
          )}
          <span>{data.subject.author.name}</span>
        </div>
        <div className="col-span-2 flex flex-col items-center py-4">
          {userState === UserState.Visitor && data.me?.picture ? (
            <img src={data.me.picture} className="rounded-full" />
          ) : (
            <span className="rounded-full h-32 w-32" />
          )}
          <span>{userState === UserState.Visitor ? data.me?.name : '???'}</span>
        </div>
        <div className="col-start-1 col-span-3 border-2">
          {data.subject.firstMessage.text}
        </div>
        {userState !== UserState.SubjectAuthor && (
          <form
            className="col-start-2 col-span-3"
            onSubmit={formik.handleSubmit}
          >
            <textarea
              name="message"
              disabled={userState === UserState.Unauthenticated}
              className="w-full border-2"
              placeholder="Deine Position"
              onChange={formik.handleChange}
              value={formik.values.message}
            ></textarea>
            {userState === UserState.Unauthenticated && (
              <div className="col-start-2 col-span-3 py-4">
                <Link href="/api/login">
                  <a className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md text-white transition duration-100 shadow-md">
                    Melde dich an, um auf dieses Thema zu antworten
                  </a>
                </Link>
              </div>
            )}
            {userState === UserState.Visitor && (
              <Button type="submit">Disput starten</Button>
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default withApollo(Subject);
