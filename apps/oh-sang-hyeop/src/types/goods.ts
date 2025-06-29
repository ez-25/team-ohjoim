// types/goods.ts

/**
 * 굿즈 상세 데이터 - JSON DB 용
 */
export interface Goods {
  id: string;
  name: string;
  artist?: string;
  image?: string | File | null;
  extraImages?: (string | File)[] | null;
  cost?: number;
  review?: string;
}

/**
 * 굿즈 카드 리스트용 타입 (썸네일, 요약)
 */
export interface GoodsItem {
  id: string;
  name: string;
  imageUrl: string; // Goods.image 경로를 가공한 값
}
