// 사용자 타입 예시
export interface User {
  id: number;
  name: string;
  email: string;
}

// 사용자 생성/수정용 타입 예시
export interface UserInput {
  name: string;
  email: string;
}

// 페이징 파라미터 타입
export interface UserListParams {
  page: number;
  pageSize?: number;
  search?: string;
}
