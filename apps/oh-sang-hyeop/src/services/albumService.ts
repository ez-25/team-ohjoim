import axios from 'axios';
import { Album } from '../types/album';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000', // JSON Server
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getAlbums() {
  const res = await apiClient.get<Album[]>('/albums');
  return res.data;
}

export async function createAlbum(data: Omit<Album, 'id'>) {
  return apiClient.post('/albums', data);
}
