'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useRef } from 'react';
import { GoogleOAuthProvider, GoogleLogin as GoogleLoginLib, CredentialResponse } from '@react-oauth/google';

import { IconGoogle } from '@/components/icons';
import { Button, PageLoader } from '@/components/ui';
import { useToast } from '@/contexts';
import useGoogleLogin from '@/hooks/auth/use-google-login';
import { GOOGLE_CLIENT_ID } from '@/utils/constants';

const GoogleLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const googleLogin = useGoogleLogin();
  const { setToast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get('ref');

  const handleOnSuccess = async (response: CredentialResponse): Promise<void> => {
    try {
      setIsLoggingIn(true);
      const tokenId = response.credential;
      await googleLogin(tokenId!);
      setIsLoggingIn(false);
      if (ref) {
        router.push(`/products/${ref}`);
      } else {
        router.push('/profile');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setToast('error', error.message);
      } else {
        setToast('error', 'An unknown error occurred');
      }
      setIsLoggingIn(false);
    }
  };

  const handleOnFailure = () => {
    setToast('error', 'Google login failed. Please try again later.');
  };

  const handleButtonClick = () => {
    googleButtonRef.current?.querySelector('button')?.click();
  };

  return (
    <>
      {isLoggingIn && <PageLoader />}
      <div className="container">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <div ref={googleButtonRef} style={{ display: 'none' }}>
            <GoogleLoginLib onSuccess={handleOnSuccess} onError={handleOnFailure} useOneTap />
          </div>
          <Button
            type="button"
            onClick={handleButtonClick}
            icon={<IconGoogle />}
            title="Login with Google"
            variant="light"
            style={{ width: '100%' }}
          />
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default GoogleLogin;
