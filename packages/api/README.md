# @repo/api

모노레포 환경에서 Next.js 및 React 프로젝트를 위한 범용 API 통신 패키지입니다.

## 설치

이 패키지는 모노레포 내에서 사용하도록 설계되었습니다. 각 Next.js 앱의 `package.json`에 의존성을 추가하세요:

```json
{
  "dependencies": {
    "@repo/api": "*"
  }
}
```

그리고 루트 디렉토리에서 의존성을 설치하세요:

```bash
pnpm install
```

## 주요 기능

- HTTP 클라이언트(apiClient) 제공 (GET, POST, PUT, DELETE, PATCH)
- React Query 기반의 CRUD 훅 팩토리(createHooks)
- 타입 안전한 API 응답 타입 제공
- 인증 토큰 자동 헤더 처리

## 1. HTTP 클라이언트 사용

```typescript
import { apiClient } from "@repo/api";

// GET 요청 예시
const getUsers = async () => {
  const users = await apiClient.get("/api/users");
  return users;
};

// POST 요청 예시
const createUser = async (userData) => {
  const response = await apiClient.post("/api/users", userData);
  return response;
};
```

## 2. React Query와 함께 사용하기

```tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@repo/api";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
```

## 3. CRUD 훅 팩토리(createHooks) 사용법

```tsx
import { createHooks } from "@repo/api";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsParams {
  page?: number;
  category?: string;
}

export const productHooks = createHooks<ProductsParams, Product[]>({
  queryKey: "products",
  url: "/api/products",
});

// 컴포넌트에서 사용
import { useState } from "react";
import { productHooks } from "../hooks/useProducts";

function ProductList() {
  const [page, setPage] = useState(1);
  const { useGet } = productHooks;
  const { data, isLoading } = useGet({ page, category: "electronics" });

  return (
    <div>
      {isLoading
        ? "상품 목록을 불러오는 중입니다..."
        : !data
          ? "표시할 상품이 없습니다."
          : JSON.stringify(data)}
    </div>
  );
}
```

## 4. 단일 API 커스텀 훅 생성 예시

아래와 같이 React Query의 useQuery, useMutation을 직접 사용하여 단일 엔드포인트용 커스텀 훅을 만들 수 있습니다.

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@repo/api";
import { ApiResponse } from "@repo/api/types";

// 단일 사용자 조회 훅
export function useUser(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => apiClient.get<ApiResponse<User>>(`/api/users/${id}`),
    enabled: !!id,
  });
}

// 사용자 생성 훅
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: UserInput) =>
      apiClient.post<ApiResponse<User>>("/api/users", userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
      queryClient.removeQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
```

## 5. 타입 예시 및 응답 구조

```typescript
// src/types.ts
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
```

## 참고 사항

- 빌드하려면 루트 디렉토리에서 `pnpm build`를 실행하세요.
- 이 패키지는 Next.js 및 React 환경에 맞춰져 있습니다.
- 인증 토큰은 localStorage의 'token' 키에서 자동으로 읽어 Authorization 헤더에 추가됩니다.
- 추가 기능이나 수정이 필요하면 패키지를 직접 수정할 수 있습니다.
