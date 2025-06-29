'use client';

import type { WordListResponse } from '@/types/word';
import { createHooks } from '@repo/api';

// @repo/api 모듈 테스트용 간단한 훅
const testApi: ReturnType<typeof createHooks<{}, WordListResponse>> = createHooks<{}, WordListResponse>({
  queryKey: ['test', 'words'],
  url: '/api/words',
});

export function useTestApi(): ReturnType<typeof testApi.useGet> {
  return testApi.useGet({});
}