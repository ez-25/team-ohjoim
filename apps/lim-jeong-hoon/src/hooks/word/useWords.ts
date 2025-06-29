'use client';

import type {
  CreateWordRequest,
  CreateWordResponse,
  UpdateWordRequest,
  UpdateWordResponse,
  WordFilters,
  WordListResponse,
  WordResponse
} from '@/types/word';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Query keys
export const wordKeys = {
  all: ['words'] as const,
  lists: () => [...wordKeys.all, 'list'] as const,
  list: (filters?: WordFilters) => [...wordKeys.lists(), filters] as const,
  details: () => [...wordKeys.all, 'detail'] as const,
  detail: (id: number) => [...wordKeys.details(), id] as const,
};

// API 호출 함수들
const api = {
  async getWords(filters: WordFilters = {}): Promise<WordListResponse> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
    const queryString = params.toString();
    const url = queryString ? `/api/words?${queryString}` : '/api/words';
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch words');
    return response.json();
  },

  async getWord(rowId: number): Promise<WordResponse> {
    const response = await fetch(`/api/words/${rowId}`);
    if (!response.ok) throw new Error('Failed to fetch word');
    return response.json();
  },

  async createWord(word: CreateWordRequest): Promise<CreateWordResponse> {
    const response = await fetch('/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(word),
    });
    if (!response.ok) throw new Error('Failed to create word');
    return response.json();
  },

  async updateWord(rowId: number, word: UpdateWordRequest): Promise<UpdateWordResponse> {
    const response = await fetch(`/api/words/${rowId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(word),
    });
    if (!response.ok) throw new Error('Failed to update word');
    return response.json();
  },

  async deleteWord(rowId: number): Promise<void> {
    const response = await fetch(`/api/words/${rowId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete word');
  },
};

// 단어 목록 조회 훅
export function useWords(filters?: WordFilters) {
  return useQuery({
    queryKey: wordKeys.list(filters),
    queryFn: () => api.getWords(filters || {}),
    staleTime: 5 * 60 * 1000, // 5분
    select: (data: WordListResponse) => data.data || [],
  });
}

// 단어 상세 조회 훅
export function useWord(rowId: number) {
  return useQuery({
    queryKey: wordKeys.detail(rowId),
    queryFn: () => api.getWord(rowId),
    enabled: !!rowId,
    select: (data: WordResponse) => data.data,
  });
}

// 단어 생성 훅
export function useCreateWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wordKeys.lists() });
      toast.success('단어가 성공적으로 추가되었습니다!');
    },
    onError: (error: Error) => {
      toast.error(`단어 추가 실패: ${error.message}`);
    },
  });
}

// 단어 수정 훅
export function useUpdateWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rowId, word }: { rowId: number; word: UpdateWordRequest }) => 
      api.updateWord(rowId, word),
    onSuccess: (data: UpdateWordResponse, variables) => {
      queryClient.invalidateQueries({ queryKey: wordKeys.lists() });
      if (data.data) {
        queryClient.setQueryData(wordKeys.detail(variables.rowId), data.data);
      }
      toast.success('단어가 성공적으로 수정되었습니다!');
    },
    onError: (error: Error) => {
      toast.error(`단어 수정 실패: ${error.message}`);
    },
  });
}

// 단어 삭제 훅
export function useDeleteWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wordKeys.lists() });
      toast.success('단어가 성공적으로 삭제되었습니다!');
    },
    onError: (error: Error) => {
      toast.error(`단어 삭제 실패: ${error.message}`);
    },
  });
}

// 복습 대상 단어 조회 훅
export function useReviewWords() {
  return useQuery({
    queryKey: wordKeys.list({ filter: 'review' }),
    queryFn: () => api.getWords({ filter: 'review' }),
    staleTime: 1 * 60 * 1000, // 1분
    select: (data: WordListResponse) => data.data || [],
  });
}