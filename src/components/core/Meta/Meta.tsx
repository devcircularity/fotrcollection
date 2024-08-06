import Head from 'next/head';
import React from 'react';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const Meta: React.FC<Props> = ({
  title = 'Buy best and quality products',
  description = 'FOTR Collection | Buy best and quality products',
  image = 'https://dress-shop.vercel.app/featured.png',
}) => {
  const siteTitle = `FOTR Collection | ${title}`;

  return (
    <Head>
      <title>{siteTitle}</title>

      <meta name="twitter:card" content={description} />
      <meta name="twitter:site" content="@dress_shop" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
    </Head>
  );
};

export default Meta;
