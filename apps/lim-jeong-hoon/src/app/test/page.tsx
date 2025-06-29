'use client';

import { useTestApi } from '@/hooks/test';

export default function TestPage() {
  const { data, isLoading, error, refetch } = useTestApi();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">@repo/api 모듈 테스트</h1>
      
      <div className="space-y-4">
        <div className="bg-white border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">테스트 상태</h2>
          
          {isLoading && (
            <div className="text-blue-600">
              🔄 @repo/api 모듈 테스트 중...
            </div>
          )}
          
          {error && (
            <div className="text-red-600">
              ❌ 오류: {error.message}
            </div>
          )}
          
          {data && (
            <div className="text-green-600">
              ✅ @repo/api 모듈 정상 작동! 단어 {data.length}개 조회됨
            </div>
          )}
        </div>

        <div className="bg-white border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">응답 데이터</h2>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>

        <button 
          onClick={() => refetch()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          다시 테스트
        </button>
      </div>
    </div>
  );
}