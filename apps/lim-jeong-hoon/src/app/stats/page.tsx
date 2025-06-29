'use client';

import { MainLayout } from "@/components/layouts";
import { StatsChart } from "@/components/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useWords } from "@/hooks/word";

export default function StatsPage() {
  const { data: words = [] } = useWords();

  // 상세 통계 계산
  const detailedStats = {
    total: words.length,
    unreviewed: words.filter(w => w.status === 'unreviewed').length,
    reviewing: words.filter(w => w.status === 'reviewing').length,
    memorized: words.filter(w => w.status === 'memorized').length,
    boxStats: {
      box1: words.filter(w => w.box === 1).length,
      box2: words.filter(w => w.box === 2).length,
      box3: words.filter(w => w.box === 3).length,
      box4: words.filter(w => w.box === 4).length,
      box5: words.filter(w => w.box === 5).length,
    },
    averageCorrect: words.length > 0 
      ? Math.round(words.reduce((sum, w) => sum + w.consecutive_correct, 0) / words.length * 10) / 10
      : 0,
    masteryRate: words.length > 0 
      ? Math.round((words.filter(w => w.status === 'memorized').length / words.length) * 100)
      : 0,
  };

  return (
    <MainLayout 
      title="학습 통계" 
    >
      <div className="space-y-6">
        {/* 핵심 지표 */}
        <div className="grid grid-cols-2 gap-4">
          <Card variant="interactive" className="text-center">
            <CardContent className="py-4">
              <div className="text-3xl font-bold text-blue-600 mb-1">{detailedStats.total}</div>
              <div className="text-sm text-gray-600">총 단어</div>
            </CardContent>
          </Card>
          
          <Card variant="interactive" className="text-center">
            <CardContent className="py-4">
              <div className="text-3xl font-bold text-green-600 mb-1">{detailedStats.masteryRate}%</div>
              <div className="text-sm text-gray-600">암기율</div>
            </CardContent>
          </Card>
        </div>

        {/* 상태별 분포 차트 */}
        <Card>
          <CardContent>
            <StatsChart 
              type="status" 
              title="학습 상태 분포" 
              height="medium"
            />
          </CardContent>
        </Card>

        {/* 일별 학습량 차트 */}
        <Card>
          <CardContent>
            <StatsChart 
              type="daily" 
              title="최근 7일 학습량" 
              height="medium"
            />
          </CardContent>
        </Card>

        {/* 박스별 분포 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Leitner Box 분포
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(box => {
                const count = detailedStats.boxStats[`box${box}` as keyof typeof detailedStats.boxStats];
                const percentage = detailedStats.total > 0 ? (count / detailedStats.total) * 100 : 0;
                
                return (
                  <div key={box} className="flex items-center gap-3">
                    <div className="w-16 text-sm font-medium text-gray-700">
                      Box {box}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              box === 1 ? 'bg-red-500' :
                              box === 2 ? 'bg-orange-500' :
                              box === 3 ? 'bg-yellow-500' :
                              box === 4 ? 'bg-blue-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-sm text-gray-600 w-12 text-right">
                          {count}개
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 학습 성취도 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              학습 성취도
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {detailedStats.averageCorrect}
                </div>
                <div className="text-sm text-gray-600">평균 연속정답</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  {detailedStats.memorized}
                </div>
                <div className="text-sm text-gray-600">암기완료 단어</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 학습 팁 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              학습 개선 제안
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              {detailedStats.masteryRate < 30 && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-500">💡</span>
                  <p>암기율이 낮습니다. 매일 조금씩이라도 꾸준히 복습해보세요.</p>
                </div>
              )}
              
              {detailedStats.boxStats.box1 > detailedStats.total * 0.5 && (
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-500">📚</span>
                  <p>Box 1에 단어가 많이 쌓여있어요. 복습을 더 자주 해보세요.</p>
                </div>
              )}
              
              {detailedStats.masteryRate >= 70 && (
                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-500">🎉</span>
                  <p>훌륭합니다! 높은 암기율을 유지하고 있어요. 새로운 단어를 추가해보세요.</p>
                </div>
              )}
              
              {detailedStats.averageCorrect >= 3 && (
                <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-500">⭐</span>
                  <p>연속정답률이 높아요! 학습 패턴이 매우 좋습니다.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}