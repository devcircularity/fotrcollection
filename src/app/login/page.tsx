'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { LoginForm, GoogleLogin } from '@/components/auth';
import { Meta } from '@/components/core';
import { Heading } from '@/components/ui';
import styles from '@/styles/Auth.module.css';

const Login = () => {
  return (
    <>
      <Meta title="Log In" />
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.authContainer}>
          <Heading>Log In</Heading>
          <LoginForm />
          <div className={styles.link}>
            Don{`'`}t have an account?
            <Link href="/signup" className={`${styles.link} ${styles.linkText}`}>
              Create an account.
            </Link>
            <div className={styles.or}>
              <div className={styles.line} />
              <div className={styles.text}>or</div>
              <div className={styles.line} />
            </div>
          </div>
          <GoogleLogin />
        </div>
      </Suspense>
    </>
  );
};

export default Login;
