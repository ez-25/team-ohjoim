'use client';

import type { ReviewRequest, ReviewResponse } from '@/types/word';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { wordKeys } from './useWords';

// API 호출 함수
const api = {
  async submitReview(review: ReviewRequest): Promise<ReviewResponse> {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    if (!response.ok) throw new Error('Failed to submit review');
    return response.json();
  },
};

// 복습 제출 훅
export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.submitReview,
    onSuccess: (result) => {
      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: wordKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      
      // API response structure: { success: boolean, data: Word, message: string }
      const updatedWord = result.data;
      const message = updatedWord?.status === 'memorized' 
        ? '🎉 완벽합니다! 암기 완료!'
        : result.success 
          ? '✅ 단어가 성공적으로 업데이트 되었습니다!'
          : '❌ 단어 업데이트에 실패했습니다.';
          
      if (result.success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    },
    onError: (error: Error) => {
      toast.error(`복습 제출 실패: ${error.message}`);
    },
  });
}