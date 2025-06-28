import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ApiResponse } from "../types";
import { createHooks } from "./createHooks";

/**
 * 통합 API 훅 생성 예시 (useGet, usePut 등 한번에 생성)
 */
const userApiHooks = createHooks<UserListParams>({
  queryKey: "users",
  url: "/api/users",
});

function UserList() {
  const [page, setPage] = useState(1);
  const { useGet } = userApiHooks;
  const { data, isLoading } = useGet({ page, pageSize: 10 });

  return (
    <div>
      {isLoading
        ? "사용자 목록을 불러오는 중입니다..."
        : !data
          ? "표시할 사용자가 없습니다."
          : JSON.stringify(data)}
    </div>
  );
}

/**
 * 단일 API 생성 예시 (useGet 등 단일 훅 생성)
 */
import { apiClient } from "../client";
import { User, UserInput, UserListParams } from "./example.types";

// user API 훅 생성 예시 (GET 방식)
export function useUser(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => apiClient.get<ApiResponse<User>>(`/api/users/${id}`),
    enabled: !!id, // id가 있을 때만 쿼리 활성화
  });
}

// user API 훅 생성 예시 (POST 방식)
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserInput) =>
      apiClient.post<ApiResponse<User>>("/api/users", data),
    onSuccess: (response) => {
      // 사용자 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      // 새로 생성된 사용자 쿼리 추가
      queryClient.setQueryData(["user", response.data.id], response);
    },
  });
}

// user API 훅 생성 예시 (PUT 방식)
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserInput }) =>
      apiClient.put<ApiResponse<User>>(`/api/users/${id}`, data),
    onSuccess: (response, variables) => {
      // 해당 사용자 쿼리 업데이트
      queryClient.invalidateQueries({
        queryKey: ["user", variables.id],
      });
      // 사용자 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}

// user API 훅 생성 예시 (DELETE 방식)
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      apiClient.delete<ApiResponse<boolean>>(`/api/users/${id}`),
    onSuccess: (_, userId) => {
      // 해당 사용자 쿼리 제거
      queryClient.removeQueries({
        queryKey: ["user", userId],
      });
      // 사용자 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
