// src/app/head.tsx
import React from 'react';
import Head from 'next/head';

const CustomHead = () => (
  <Head>
    <link rel="shortcut icon" href="/logo.png" />
    <link
      rel="stylesheet"
      type="text/css"
      charSet="UTF-8"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    />
  </Head>
);

export default CustomHead;
