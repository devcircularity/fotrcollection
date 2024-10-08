'use client';

import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { Meta } from '@/components/core';
import { Button, PageLoader, Input } from '@/components/ui';
import { useToast } from '@/contexts';
import useSignup from '@/hooks/auth/use-signup';

import styles from './Signup.module.css';

const Schema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(6, 'Name must be at least 6 chars long'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 chars long'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

const SignUpForm = () => {
  const { setToast } = useToast();
  const signup = useSignup();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    email: '',
    password: '',
    name: '',
  };

  return (
    <>
      <Meta title="Sign Up" />
      {submitting && <PageLoader />}
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={async (values) => {
          try {
            console.log('Submitting sign-up data:', values);
            setSubmitting(true);
            const response = await signup(values);
            console.log('Sign-up response:', response);
            setSubmitting(false);
            router.push('/profile');
          } catch (error: any) {
            console.log('Sign-up error:', error);
            const errorMessage = error.response?.data?.message || error.message;
            setToast('error', errorMessage);
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <Input
              aria-label="Name"
              name="name"
              id="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              type="text"
              error={Boolean(errors.name && touched.name)}
            />
            {errors.name && touched.name ? <div className={styles.error}>{errors.name}</div> : null}
            <Input
              aria-label="Email"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              type="email"
              error={Boolean(errors.email && touched.email)}
            />
            {errors.email && touched.email ? (
              <div className={styles.error}>{errors.email}</div>
            ) : null}
            <Input
              aria-label="Password"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              type="password"
              error={Boolean(errors.password && touched.password)}
            />
            {errors.password && touched.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}

            <div className={styles.bottom}>
              <Button
                type="submit"
                title="Sign Up"
                disabled={submitting}
                loading={submitting}
                className={styles.button}
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
