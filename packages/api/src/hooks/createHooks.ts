/**
 * API 쿼리 훅 팩토리
 */
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { apiClient } from "../client";

// 쿼리 함수 타입 정의
export type QueryFn<TParams, TData> = (params: TParams) => Promise<TData>;

// 커스텀 훅 생성을 위한 파라미터 타입 정의
export interface CreateHooksParams<TParams, TData> {
  queryKey: string | string[];
  queryFn?: QueryFn<TParams, TData>;
  url?: string;
}

/**
 * API 훅 생성 팩토리 함수
 */
export function createHooks<TParams = void, TData = unknown, TError = Error>({
  queryKey,
  queryFn,
  url,
}: CreateHooksParams<TParams, TData>) {
  // 주어진 queryKey를 배열로 변환
  const baseQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];

  // 기본 queryFn 생성 (url이 제공된 경우)
  const defaultQueryFn = url
    ? (params: TParams): Promise<TData> => {
        // GET 요청으로 URL에 파라미터 추가
        const queryParams = new URLSearchParams();

        if (params && typeof params === "object") {
          Object.entries(params as Record<string, any>).forEach(
            ([key, value]) => {
              if (value !== undefined) {
                queryParams.append(key, String(value));
              }
            }
          );
        }

        const queryString = queryParams.toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        return apiClient.get<TData>(fullUrl);
      }
    : queryFn;

  if (!defaultQueryFn) {
    throw new Error(
      "createHooks: queryFn 또는 url 중 하나는 반드시 제공되어야 합니다."
    );
  }

  // GET 요청을 위한 useQuery 훅
  function useGet(
    params: TParams,
    options?: Omit<
      UseQueryOptions<TData, TError, TData, readonly (string | TParams)[]>,
      "queryKey" | "queryFn"
    >
  ) {
    // 파라미터를 queryKey에 포함시켜 캐싱이 제대로 동작하도록 함
    const fullQueryKey = [...baseQueryKey, params] as const;

    return useQuery<TData, TError, TData, readonly (string | TParams)[]>({
      queryKey: fullQueryKey,
      queryFn: () => {
        if (!defaultQueryFn)
          throw new Error("No queryFn or url provided for GET request.");
        return defaultQueryFn(params);
      },
      ...options,
    });
  }

  // POST 요청을 위한 useMutation 훅
  function usePost(options?: UseMutationOptions<TData, TError, TParams>) {
    return useMutation<TData, TError, TParams>({
      mutationFn: (data: TParams) => {
        if (url) {
          return apiClient.post<TData>(url, data);
        }
        if (!defaultQueryFn) {
          throw new Error("No queryFn or url provided for POST request.");
        }
        return defaultQueryFn(data);
      },
      ...options,
    });
  }

  // PUT 요청을 위한 useMutation 훅
  function usePut(options?: UseMutationOptions<TData, TError, TParams>) {
    return useMutation<TData, TError, TParams>({
      mutationFn: (data: TParams) => {
        if (url) {
          return apiClient.put<TData>(url, data);
        }
        if (!defaultQueryFn) {
          throw new Error("No queryFn or url provided for PUT request.");
        }
        return defaultQueryFn(data);
      },
      ...options,
    });
  }

  // DELETE 요청을 위한 useMutation 훅
  function useDelete(options?: UseMutationOptions<TData, TError, TParams>) {
    return useMutation<TData, TError, TParams>({
      mutationFn: (params: TParams) => {
        // DELETE 요청에서는 params를 쿼리 파라미터로 변환
        if (url) {
          const queryParams = new URLSearchParams();

          if (params && typeof params === "object") {
            Object.entries(params as Record<string, any>).forEach(
              ([key, value]) => {
                if (value !== undefined) {
                  queryParams.append(key, String(value));
                }
              }
            );
          }

          const queryString = queryParams.toString();
          const fullUrl = queryString ? `${url}?${queryString}` : url;

          return apiClient.delete<TData>(fullUrl);
        }

        if (!defaultQueryFn) {
          throw new Error("No queryFn or url provided for DELETE request.");
        }
        return defaultQueryFn(params);
      },
      ...options,
    });
  }

  // PATCH 요청을 위한 useMutation 훅
  function usePatch(options?: UseMutationOptions<TData, TError, TParams>) {
    return useMutation<TData, TError, TParams>({
      mutationFn: (data: TParams) => {
        if (url) {
          return apiClient.patch<TData>(url, data);
        }
        if (!defaultQueryFn) {
          throw new Error("No queryFn or url provided for PATCH request.");
        }
        return defaultQueryFn(data);
      },
      ...options,
    });
  }

  return {
    useGet,
    usePost,
    usePut,
    useDelete,
    usePatch,
  };
}
