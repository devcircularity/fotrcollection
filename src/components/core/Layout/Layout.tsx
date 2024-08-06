'use client';

import React, { ReactNode } from 'react';
import Head from 'next/head';

interface Props {
  title?: string;
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children, title = 'Dress Shop' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
