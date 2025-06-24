/**
 * API 응답 관련 공통 타입 정의
 */

// 표준 API 응답 형식
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// 일반적인 에러 응답 형식
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// API 요청 옵션
export interface ApiRequestOptions extends RequestInit {
  skipAuth?: boolean; // 인증 헤더를 건너뛰는 옵션
  baseUrl?: string; // 기본 URL을 오버라이드하는 옵션
  timeout?: number; // 요청 타임아웃 (밀리초)
}

// 검색 파라미터
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
}

// API 설정 타입
export interface ApiConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
}
