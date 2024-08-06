'use client';

import { ThemeProvider } from 'next-themes';
import React, { ReactNode } from 'react';
import { SWRConfig } from 'swr';

import { ToastProvider } from './toast';
import { CategoryProvider } from './CategoryContext'; // Import the CategoryProvider

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false, dedupingInterval: 0 }}>
      <ThemeProvider>
        <ToastProvider>
          <CategoryProvider>{children}</CategoryProvider> {/* Wrap children with CategoryProvider */}
        </ToastProvider>
      </ThemeProvider>
    </SWRConfig>
  );
};
