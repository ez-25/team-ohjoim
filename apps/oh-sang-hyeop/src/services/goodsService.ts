import axios from 'axios';
import { Goods } from '@/types/goods';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000', // JSON Server
  headers: {
    'Content-Type': 'application/json',
  },
});


// 목록 조회
export async function getGoods() {
  const res = await apiClient.get<Goods[]>('/goods');
  return res.data;
}

// 단건 조회
export async function getGoodsById(id: string) {
  const res = await apiClient.get<Goods>(`/goods/${id}`);
  return res.data;
}

// 등록
export async function createGoods(data: Omit<Goods, 'id'>) {
  return apiClient.post<Goods>('/goods', data);
}
