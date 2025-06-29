'use client';

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useReviewWords, useSubmitReview } from "@/hooks/word";
import type { ReviewRequest, Word } from "@/types/word";
import { cn } from "@/utils/cn";
import { useEffect, useState } from 'react';
import { ReviewCard } from "../ReviewCard";
import {
  reviewCompleteStyles,
  reviewStartStyles,
  reviewStatCardStyles,
  reviewStatsStyles,
  reviewTestStyles
} from "./ReviewTest.styles";

interface ReviewTestProps {
  onComplete?: () => void;
  className?: string;
}

interface ReviewResult {
  word: Word;
  isCorrect: boolean;
  answer: string;
}

export function ReviewTest({ onComplete, className }: ReviewTestProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ReviewResult[]>([]);
  const [mode, setMode] = useState<'word-to-meaning' | 'meaning-to-word'>('word-to-meaning');

  const { data: reviewWords = [], isLoading } = useReviewWords();
  const submitReviewMutation = useSubmitReview();

  const currentWord = reviewWords[currentIndex];
  const isCompleted = currentIndex >= reviewWords.length;

  // 복습 모드 랜덤 선택
  useEffect(() => {
    setMode(Math.random() > 0.5 ? 'word-to-meaning' : 'meaning-to-word');
  }, [currentIndex]);

  const handleAnswer = async (isCorrect: boolean, answer: string) => {
    if (!currentWord) return;

    // 결과 저장
    const result: ReviewResult = {
      word: currentWord,
      isCorrect,
      answer,
    };
    setResults(prev => [...prev, result]);

    // 백엔드에 복습 결과 제출
    try {
      const reviewRequest: ReviewRequest = {
        rowId: currentWord.rowId,
        isCorrect,
        lastReviewDate: new Date().toISOString().split('T')[0] ?? '',
        nextReviewDate: calculateNextReviewDate(currentWord, isCorrect),
      };

      await submitReviewMutation.mutateAsync(reviewRequest);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }

    // 다음 단어로 이동
    setCurrentIndex(prev => prev + 1);
  };

  const calculateNextReviewDate = (word: Word, isCorrect: boolean): string => {
    const today = new Date();
    const intervals = {
      1: 1,   // 1일
      2: 3,   // 3일
      3: 7,   // 7일
      4: 14,  // 14일
      5: 30,  // 30일
    };

    let nextBox = word.box;
    let intervalDays = intervals[word.box as keyof typeof intervals] || 1;

    if (isCorrect) {
      nextBox = Math.min(word.box + 1, 5) as Word['box'];
      intervalDays = intervals[nextBox as keyof typeof intervals];
    } else {
      nextBox = 1;
      intervalDays = intervals[1];
    }

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + intervalDays);
    
    return nextDate.toISOString().split('T')[0] ?? '';
  };

  const stats = {
    total: results.length,
    correct: results.filter(r => r.isCorrect).length,
    accuracy: results.length > 0 ? Math.round((results.filter(r => r.isCorrect).length / results.length) * 100) : 0,
  };

  if (isLoading) {
    return (
      <div className={reviewStartStyles()}>
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">복습할 단어를 준비하는 중...</p>
      </div>
    );
  }

  if (reviewWords.length === 0) {
    return (
      <div className={reviewStartStyles()}>
        <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🎉 모든 복습을 완료했습니다!
        </h2>
        <p className="text-gray-600 mb-6">
          오늘 복습할 단어가 없습니다.<br />
          내일 다시 찾아와 주세요!
        </p>
        <Button variant="primary" onClick={onComplete}>
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className={reviewStartStyles()}>
        <svg className="w-16 h-16 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          복습을 시작할 준비가 되었습니다!
        </h2>
        <p className="text-gray-600 mb-6">
          총 <span className="font-semibold text-blue-600">{reviewWords.length}개</span>의 단어를 복습합니다.<br />
          Leitner 박스 시스템으로 효율적인 학습을 시작해보세요.
        </p>
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => setIsStarted(true)}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a1 1 0 001 1h4M9 10V9a1 1 0 011-1h4a1 1 0 011 1v1" />
            </svg>
          }
        >
          복습 시작하기
        </Button>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className={cn(reviewCompleteStyles(), className)}>
        <Card variant="elevated" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              복습 완료! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90">
              오늘의 복습을 모두 마쳤습니다. 수고하셨어요!
            </p>
          </CardContent>
        </Card>

        <div className={reviewStatsStyles()}>
          <div className={reviewStatCardStyles()}>
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600">총 단어</div>
          </div>
          
          <div className={reviewStatCardStyles()}>
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.correct}</div>
            <div className="text-sm text-gray-600">정답</div>
          </div>
          
          <div className={reviewStatCardStyles()}>
            <div className="text-3xl font-bold text-red-600 mb-1">{stats.total - stats.correct}</div>
            <div className="text-sm text-gray-600">오답</div>
          </div>
          
          <div className={reviewStatCardStyles()}>
            <div className="text-3xl font-bold text-purple-600 mb-1">{stats.accuracy}%</div>
            <div className="text-sm text-gray-600">정답률</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>복습 결과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result) => (
                <div 
                  key={result.word.rowId} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {result.isCorrect ? '✅' : '❌'}
                    </span>
                    <div>
                      <div className="font-medium">{result.word.word}</div>
                      <div className="text-sm text-gray-600">{result.word.meaning}</div>
                    </div>
                  </div>
                  {!result.isCorrect && (
                    <div className="text-xs text-gray-500">
                      입력: {result.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="primary" layout="block" onClick={onComplete}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  if (!currentWord) {
    // 예외 처리: currentWord가 undefined인 경우 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <div className={cn(reviewTestStyles(), className)}>
      <ReviewCard
        word={currentWord}
        currentIndex={currentIndex}
        totalCount={reviewWords.length}
        mode={mode}
        onAnswer={handleAnswer}
      />
    </div>
  );
}