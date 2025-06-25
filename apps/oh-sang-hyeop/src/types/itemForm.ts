export type ItemType = 'concert' | 'album' | 'goods';

export interface FormValues {
  name: string;
  location?: string; // 콘서트만 해당
  image?: File | null; // ✅ 메인 이미지 
  extraImages?: File[]| null; // ✅ 추가 이미지
  artist?: string;
  date?: string; // ISO 형식 (예: '2025-06-25')
  cost?: number;
  review?: string;
  countryCodes?: string[]; // 선택된 국가 코드 배열
}
