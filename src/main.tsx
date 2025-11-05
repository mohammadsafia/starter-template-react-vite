import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { queryClient } from '@api/config';
import { ROUTER } from '@routes';
import './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <RouterProvider router={ROUTER} future={{ v7_startTransition: true }} />
      </NuqsAdapter>
      <ReactQueryDevtools buttonPosition="top-left" />
    </QueryClientProvider>
  </StrictMode>,
);
