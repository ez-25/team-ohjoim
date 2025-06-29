'use client';

import { useQuery } from '@tanstack/react-query';
import type { StatsData, StatsResponse } from '@/types/word';

// Query keys
export const statsKeys = {
  all: ['stats'] as const,
  data: () => [...statsKeys.all, 'data'] as const,
};

// API 호출 함수
const api = {
  async getStats(): Promise<StatsData> {
    const response = await fetch('/api/stats');
    if (!response.ok) throw new Error('Failed to fetch stats');
    const result: StatsResponse = await response.json();
    if (!result.data) throw new Error('Stats data not found');
    return result.data;
  },
};

// 통계 데이터 조회 훅
export function useStats() {
  return useQuery({
    queryKey: statsKeys.data(),
    queryFn: api.getStats,
    staleTime: 2 * 60 * 1000, // 2분
    refetchInterval: 5 * 60 * 1000, // 5분마다 자동 갱신
  });
}