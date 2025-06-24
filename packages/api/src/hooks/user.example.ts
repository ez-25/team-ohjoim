/**
 * API 사용을 위한 커스텀 훅 사용 예제
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import { ApiResponse } from "../types";
import { createHooks } from "./createHooks";

// 사용자 타입 예시
interface User {
  id: number;
  name: string;
  email: string;
}

// 사용자 생성/수정용 타입 예시
interface UserInput {
  name: string;
  email: string;
}

// 페이징 파라미터 타입
interface UserListParams {
  page: number;
  pageSize?: number;
  search?: string;
}

/**
 * 사용자 API 관련 훅 (예시)
 */

// createHooks를 사용한 User API 훅 생성
export const userApiHooks = createHooks<UserListParams>({
  queryKey: "users",
  url: "/api/users",
});

// 단일 사용자 조회 훅
export function useUser(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => apiClient.get<ApiResponse<User>>(`/api/users/${id}`),
    enabled: !!id, // id가 있을 때만 쿼리 활성화
  });
}

// 사용자 생성 훅
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserInput) =>
      apiClient.post<ApiResponse<User>>("/api/users", userData),
    onSuccess: () => {
      // 사용자 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}

// 사용자 수정 훅
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

// 사용자 삭제 훅
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

/**
 * 사용 예시:
 *
 * ```tsx
 * function UserList() {
 *   const [page, setPage] = useState(1);
 *   const { useGet } = userApiHooks;
 *   const { data, isLoading } = useGet({ page, pageSize: 10 });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *
 *   return (
 *     <div>
 *       {data?.items.map(user => (
 *         <div key={user.id}>{user.name}</div>
 *       ))}
 *       <Pagination
 *         currentPage={page}
 *         totalPages={data?.totalPages || 1}
 *         onPageChange={setPage}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
