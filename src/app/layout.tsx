'use client';

import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { AppProviders } from '@/contexts';
import Header from '@/components/core/Header';
import Footer from '@/components/core/Footer';
import { initGA, logPageView } from '@/utils/analytics';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/global.css';
import '@/styles/nprogress.css';

import styles from '../styles/Layout.module.css';

NProgress.configure({ showSpinner: false });

declare const window: Window &
  typeof globalThis & {
    GA_INITIALIZED: any;
  };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    console.log('RootLayout mounted');
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();

    const handleRouteChangeStart = () => {
      console.log('Route change started');
      NProgress.start();
    };

    const handleRouteChangeComplete = () => {
      console.log('Route change completed');
      NProgress.done();
    };

    const handleRouteChangeError = () => {
      console.log('Route change error');
      NProgress.done();
    };

    // Add event listeners
    window.addEventListener('routeChangeStart', handleRouteChangeStart);
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete);
    window.addEventListener('routeChangeError', handleRouteChangeError);

    // Cleanup function
    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChangeStart);
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
      window.removeEventListener('routeChangeError', handleRouteChangeError);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>FOTR Collection</title>
        <meta property="og:title" content="FOTR Collection" key="title" />
      </head>
      <body>
        <AppProviders>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
