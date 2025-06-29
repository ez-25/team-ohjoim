// types/item.ts
export type ItemType = 'concert' | 'album' | 'goods';

export interface ItemDetailData {
  type: ItemType;
  title: string;
  image: string;
  extraImages?: string[];
  artist: string;
  date: string;
  location?: string; // 콘서트만 표시
  cost: number;
  review?: string;    // 감상평 내용
  popularity: number;
}
