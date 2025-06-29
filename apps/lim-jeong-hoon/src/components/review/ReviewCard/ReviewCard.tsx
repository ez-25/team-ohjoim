'use client';

import { useState, useEffect } from 'react';
import { cn } from "@/utils/cn";
import { Button, Input } from "@/components/ui";
import type { Word } from "@/types/word";
import { 
  reviewCardStyles, 
  reviewHeaderStyles, 
  reviewProgressStyles,
  reviewContentStyles,
  reviewWordStyles,
  reviewMeaningStyles,
  reviewExampleStyles,
  reviewActionsStyles,
  reviewInputStyles
} from "./ReviewCard.styles";

interface ReviewCardProps {
  word: Word;
  currentIndex: number;
  totalCount: number;
  mode: 'word-to-meaning' | 'meaning-to-word';
  onAnswer: (isCorrect: boolean, answer: string) => void;
  className?: string;
}

type ReviewState = 'question' | 'answer' | 'result';

export function ReviewCard({ 
  word, 
  currentIndex, 
  totalCount,
  mode,
  onAnswer,
  className 
}: ReviewCardProps) {
  const [reviewState, setReviewState] = useState<ReviewState>('question');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // 단어가 바뀔 때마다 상태 초기화
  useEffect(() => {
    setReviewState('question');
    setUserAnswer('');
    setIsCorrect(false);
    setShowHint(false);
  }, [word.rowId]);

  const checkAnswer = () => {
    const correctAnswer = mode === 'word-to-meaning' ? word.meaning : word.word;
    const userAnswerTrimmed = userAnswer.trim().toLowerCase();
    const correctAnswerTrimmed = correctAnswer.toLowerCase();
    
    // 정확한 일치 또는 포함 관계로 정답 체크 (유연한 채점)
    const correct = 
      userAnswerTrimmed === correctAnswerTrimmed ||
      correctAnswerTrimmed.includes(userAnswerTrimmed) ||
      userAnswerTrimmed.includes(correctAnswerTrimmed);

    setIsCorrect(correct);
    setReviewState('answer');
  };

  const handleSubmit = () => {
    if (reviewState === 'question' && userAnswer.trim()) {
      checkAnswer();
    } else if (reviewState === 'answer') {
      setReviewState('result');
    } else if (reviewState === 'result') {
      onAnswer(isCorrect, userAnswer);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const getProgressColor = () => {
    const percentage = ((currentIndex + 1) / totalCount) * 100;
    if (percentage <= 33) return 'bg-red-500';
    if (percentage <= 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const renderQuestion = () => (
    <>
      <div className={reviewContentStyles()}>
        <div className={reviewWordStyles()}>
          {mode === 'word-to-meaning' ? word.word : word.meaning}
        </div>
        
        <p className="text-gray-600 mb-6">
          {mode === 'word-to-meaning' ? '이 단어의 뜻은?' : '이 뜻에 해당하는 영어 단어는?'}
        </p>

        <div className={reviewInputStyles()}>
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={mode === 'word-to-meaning' ? '뜻을 입력하세요' : '영어 단어를 입력하세요'}
            size="lg"
            autoFocus
          />
        </div>

        {word.example && showHint && (
          <div className={reviewExampleStyles()}>
            💡 힌트: "{word.example}"
          </div>
        )}
      </div>

      <div className={reviewActionsStyles()}>
        <Button
          variant="ghost"
          onClick={() => setShowHint(true)}
          disabled={showHint}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
        >
          {showHint ? '힌트 표시됨' : '힌트 보기'}
        </Button>

        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!userAnswer.trim()}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        >
          확인
        </Button>
      </div>
    </>
  );

  const renderAnswer = () => (
    <>
      <div className={reviewContentStyles()}>
        <div className={reviewWordStyles()}>
          {word.word}
        </div>
        <div className={reviewMeaningStyles()}>
          {word.meaning}
        </div>

        {word.example && (
          <div className={reviewExampleStyles()}>
            "{word.example}"
          </div>
        )}

        <div className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect ? '✅ 정답입니다!' : '❌ 틀렸습니다'}
        </div>

        {!isCorrect && (
          <div className="text-gray-600">
            <p>입력하신 답: <span className="font-medium">{userAnswer}</span></p>
            <p>정답: <span className="font-medium text-green-600">
              {mode === 'word-to-meaning' ? word.meaning : word.word}
            </span></p>
          </div>
        )}
      </div>

      <div className={reviewActionsStyles()}>
        <Button
          variant="primary"
          onClick={handleSubmit}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          }
        >
          다음 단어
        </Button>
      </div>
    </>
  );

  const renderResult = () => (
    <>
      <div className={reviewContentStyles()}>
        <div className="text-6xl mb-4">
          {isCorrect ? '🎉' : '💪'}
        </div>
        
        <div className="text-2xl font-bold mb-4 text-gray-900">
          {isCorrect ? '잘했어요!' : '다음엔 더 잘할 수 있어요!'}
        </div>
        
        <p className="text-gray-600 mb-6">
          이 단어는 Box {word.box}에서 
          {isCorrect ? ' 다음 단계로 이동합니다.' : ' 다시 복습하게 됩니다.'}
        </p>
      </div>

      <div className={reviewActionsStyles()}>
        <Button
          variant="primary"
          onClick={handleSubmit}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          }
        >
          계속하기
        </Button>
      </div>
    </>
  );

  return (
    <div className={cn(
      reviewCardStyles({ 
        reviewMode: reviewState 
      }),
      className
    )}>
      <div className={reviewHeaderStyles()}>
        <div className={reviewProgressStyles()}>
          <span>{currentIndex + 1} / {totalCount}</span>
          <div className="w-2 h-2 rounded-full bg-gray-300 mx-2" />
          <span>Box {word.box}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-300", getProgressColor())}
              style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {Math.round(((currentIndex + 1) / totalCount) * 100)}%
          </span>
        </div>
      </div>

      {reviewState === 'question' && renderQuestion()}
      {reviewState === 'answer' && renderAnswer()}
      {reviewState === 'result' && renderResult()}
    </div>
  );
}