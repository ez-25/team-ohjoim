/**
 * React Query 클라이언트 설정
 */
import { QueryClient } from "@tanstack/react-query";

// 기본 QueryClient 설정
export const queryClient = new QueryClient({
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
});
