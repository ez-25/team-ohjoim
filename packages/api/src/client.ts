/**
 * HTTP 클라이언트 래퍼
 * 모든 API 요청의 기본이 되는 함수
 */

// 쿠키 또는 로컬 스토리지에서 토큰을 가져오는 함수
const getAuthToken = (): string | null => {
  // 브라우저 환경인지 확인
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  // 서버 환경에서는 null 반환 (혹은 서버 쪽 토큰 처리 로직 구현 필요)
  return null;
};

/**
 * 범용 HTTP 요청 함수
 */
export async function fetcher<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  // 기본 헤더 설정
  const headers = new Headers(init?.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // 인증 토큰이 있으면 헤더에 추가
  const token = getAuthToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // fetch 요청 실행
  const response = await fetch(input, {
    ...init,
    headers,
  });

  // 에러 처리
  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    const error = new Error(
      `API Error: ${response.status} ${response.statusText} - ${errorBody}`
    );
    (error as any).status = response.status;
    (error as any).statusText = response.statusText;
    (error as any).data = errorBody;
    throw error;
  }

  // 응답 본문이 있는지 확인
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return response.text() as unknown as Promise<T>;
}

/**
 * HTTP 메서드별 편의 함수
 */
export const apiClient = {
  // GET 요청
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    return fetcher<T>(url, { ...options, method: "GET" });
  },

  // POST 요청
  async post<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return fetcher<T>(url, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // PUT 요청
  async put<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return fetcher<T>(url, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // DELETE 요청
  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return fetcher<T>(url, { ...options, method: "DELETE" });
  },

  // PATCH 요청
  async patch<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return fetcher<T>(url, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  },
};
