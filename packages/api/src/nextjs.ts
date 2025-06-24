/**
 * Next.js에서 SSR/SSG를 위한 유틸리티 함수
 */
import {
  QueryClient,
  dehydrate,
  type DehydratedState,
} from "@tanstack/react-query";
import type {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  PreviewData,
} from "next";
import type { ParsedUrlQuery } from "querystring";

// 서버를 위한 QueryClient 생성 함수
export const getQueryClientForServer = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: Infinity,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

// 서버 사이드 렌더링을 위한 쿼리 프리페칭 유틸리티
export async function prefetchQueries<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  P extends PreviewData = PreviewData,
>(
  context: GetServerSidePropsContext<Q, P>,
  queries: Array<{
    queryKey: unknown[];
    queryFn: () => Promise<unknown>;
  }>
): Promise<DehydratedState> {
  const queryClient = getQueryClientForServer();

  // 모든 쿼리 프리패칭 실행
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    )
  );

  // 쿼리 상태 직렬화
  return dehydrate(queryClient);
}

// 정적 생성을 위한 쿼리 프리페칭 유틸리티
export async function prefetchQueriesForStatic<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  P extends PreviewData = PreviewData,
>(
  context: GetStaticPropsContext<Q, P>,
  queries: Array<{
    queryKey: unknown[];
    queryFn: () => Promise<unknown>;
  }>
): Promise<DehydratedState> {
  const queryClient = getQueryClientForServer();

  // 모든 쿼리 프리패칭 실행
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    )
  );

  // 쿼리 상태 직렬화
  return dehydrate(queryClient);
}

// 서버 사이드에서 API 호출을 위한 유틸리티 (쿠키 인증 처리)
export async function serverSideApiClient<T>(
  url: string,
  options: RequestInit = {},
  context?: GetServerSidePropsContext
): Promise<T> {
  // 서버 사이드에서는 쿠키를 수동으로 전달
  const headers = new Headers(options.headers || {});

  // 컨텍스트가 제공된 경우 쿠키 처리
  if (context && context.req && context.req.headers.cookie) {
    headers.set("Cookie", context.req.headers.cookie);
  }

  // 서버에서 fetch 호출
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Server API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}
