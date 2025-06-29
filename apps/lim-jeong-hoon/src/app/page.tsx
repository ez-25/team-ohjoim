'use client';

import { MainLayout } from "@/components/layouts";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { WordForm } from "@/components/word";
import { useReviewWords, useWords } from "@/hooks/word";
import { useState } from 'react';

export default function HomePage() {
  const [showAddForm, setShowAddForm] = useState(false);
  
  const { data: allWords = [] } = useWords();
  const { data: reviewWords = [] } = useReviewWords();

  // 통계 계산
  const stats = {
    total: allWords.length,
    unreviewed: allWords.filter(w => w.status === 'unreviewed').length,
    reviewing: allWords.filter(w => w.status === 'reviewing').length,
    memorized: allWords.filter(w => w.status === 'memorized').length,
    needReview: reviewWords.length,
  };

  const headerActions = (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setShowAddForm(true)}
      leftIcon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      }
      className="text-white hover:bg-white/20"
    >
      추가
    </Button>
  );

  return (
    <MainLayout 
      title="외우자영단어" 
      headerActions={headerActions}
    >
      {showAddForm ? (
        <div className="space-y-6">
          <Card>
            <CardContent>
              <WordForm
                onSuccess={() => setShowAddForm(false)}
                onCancel={() => setShowAddForm(false)}
              />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* 환영 카드 */}
          <Card variant="elevated" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                오늘도 함께 공부해요!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 mb-4">
                꾸준한 학습이 실력을 만듭니다. 
                {stats.needReview > 0 ? (
                  <span className="font-semibold"> {stats.needReview}개의 단어가 복습을 기다리고 있어요!</span>
                ) : (
                  <span> 오늘의 복습을 모두 완료했어요! 🎉</span>
                )}
              </p>
              {stats.needReview > 0 && (
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  복습 시작하기
                </Button>
              )}
            </CardContent>
          </Card>

          {/* 통계 그리드 */}
          <div className="grid grid-cols-2 gap-4">
            <Card variant="interactive" className="text-center hover-lift animate-scale-in">
              <CardContent className="py-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">{stats.total}</div>
                <div className="text-sm text-gray-600">총 단어</div>
              </CardContent>
            </Card>
            
            <Card variant="interactive" className="text-center hover-lift animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="py-4">
                <div className="text-2xl font-bold text-green-600 mb-1">{stats.memorized}</div>
                <div className="text-sm text-gray-600">암기완료</div>
              </CardContent>
            </Card>
            
            <Card variant="interactive" className="text-center hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="py-4">
                <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.reviewing}</div>
                <div className="text-sm text-gray-600">복습중</div>
              </CardContent>
            </Card>
            
            <Card variant="interactive" className="text-center hover-lift animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="py-4">
                <div className="text-2xl font-bold text-red-600 mb-1">{stats.needReview}</div>
                <div className="text-sm text-gray-600">복습 대기</div>
              </CardContent>
            </Card>
          </div>

          {/* 퀵 액션 */}
          <Card>
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="primary" 
                  layout="block"
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  }
                  onClick={() => setShowAddForm(true)}
                >
                  단어 추가
                </Button>
                
                <Button 
                  variant="secondary" 
                  layout="block"
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  }
                  disabled={stats.needReview === 0}
                >
                  복습 시작
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 학습 팁 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                학습 팁
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 매일 조금씩이라도 꾸준히 학습하세요</p>
                <p>• 복습 알림이 오면 바로 복습하는 것이 효과적입니다</p>
                <p>• 예문을 함께 외우면 더 오래 기억됩니다</p>
                <p>• 어려운 단어는 여러 번 반복해서 보세요</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </MainLayout>
  );
}