# @repo/api

모노레포 환경에서 Next.js 프로젝트를 위한 범용 API 통신 패키지입니다.

## 기능

- HTTP 클라이언트 래퍼 (fetch 기반)
- React Query 기반 데이터 관리
- 재사용 가능한 훅 팩토리
- SSR/SSG 지원
- TypeScript로 완벽한 타입 지원

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

## 사용 방법

### 1. HTTP 클라이언트 사용

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

### 2. React Query와 함께 사용

```tsx
// _app.tsx
import { AppProps } from "next/app";
import { QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { queryClient } from "@repo/api";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={(pageProps as any).dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
```

### 3. 훅 팩토리 사용

```tsx
// hooks/useProducts.ts
import { createHooks, PaginatedResponse } from "@repo/api";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsParams {
  page: number;
  category?: string;
}

export const productHooks = createHooks<
  ProductsParams,
  PaginatedResponse<Product>
>({
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

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div>
      {data?.items.map((product) => <div key={product.id}>{product.name}</div>)}
    </div>
  );
}
```

### 4. SSR/SSG에서 사용

```tsx
// pages/users.tsx
import { GetServerSideProps } from "next";
import { dehydrate } from "@tanstack/react-query";
import { prefetchQueries, apiClient, userApiHooks } from "@repo/api";

export default function UsersPage() {
  const { useGet } = userApiHooks;
  const { data } = useGet({ page: 1 });

  return <div>{/* 컴포넌트 내용 */}</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const dehydratedState = await prefetchQueries(context, [
    {
      queryKey: ["users", { page: 1 }],
      queryFn: () => apiClient.get("/api/users?page=1"),
    },
  ]);

  return {
    props: {
      dehydratedState,
    },
  };
};
```

## 참고 사항

- 빌드하려면 루트 디렉토리에서 `pnpm build`를 실행하세요
- 이 패키지는 Next.js 환경에 맞춰져 있으며, SSR/SSG를 완벽히 지원합니다
- 추가 기능이나 수정이 필요하면 패키지를 직접 수정할 수 있습니다
