import React from 'react';
import Head from 'next/head';

interface SeoProps {
  title?: string;
}

const Seo = (props: SeoProps): JSX.Element => {
  const title = [props.title, '2dispute.com']
    .filter(string => !!string)
    .join(' | ');

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Seo;
