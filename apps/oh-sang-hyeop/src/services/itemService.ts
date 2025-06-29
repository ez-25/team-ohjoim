// src/services/itemService.ts
import axios from 'axios';
import { FormValues } from '@/types/itemForm';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000', // JSON Server
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function createItem(data: FormValues) {
  return apiClient.post('/items', data);
}

export async function getItems() {
  const response = await apiClient.get('/items');
  return response.data;
}

export async function getItemById(id: string) {
  const res = await apiClient.get(`/items/${id}`);
  return res.data;
}