'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

export function QueryProvider({ children }: { children: React.ReactNode }) {

  const queryClient = new QueryClient(
    {
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 3, // 3분
          gcTime: 1000 * 60 * 10, // 10분 (이전 cacheTime)
          retry: 1, // 실패 시 1번 재시도
          refetchOnWindowFocus: true, // 창에 포커스될 때 refetch
        },
        mutations: {
          retry: false, // 뮤테이션은 재시도하지 않음
        },
      },
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}