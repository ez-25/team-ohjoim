'use client';

import { Button, Input } from "@/components/ui";
import { useDeleteWord, useWords } from "@/hooks/word";
import type { Word, WordFilters } from "@/types/word";
import { cn } from "@/utils/cn";
import { useState } from 'react';
import { WordCard } from "../WordCard";
import {
  statCardStyles,
  statsRowStyles,
  wordListEmptyStyles,
  wordListErrorStyles,
  wordListHeaderStyles,
  wordListStyles,
  wordListTitleStyles
} from "./WordList.styles";

interface WordListProps {
  filters?: WordFilters;
  onWordEdit?: (word: Word) => void;
  onWordClick?: (word: Word) => void;
  showStats?: boolean;
  className?: string;
}

export function WordList({ 
  filters, 
  onWordEdit, 
  onWordClick,
  showStats = true,
  className 
}: WordListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [localFilters, setLocalFilters] = useState<WordFilters>(filters || {});

  // 검색어가 있으면 필터에 추가
  const finalFilters = {
    ...localFilters,
    ...(searchTerm && { search: searchTerm }),
  };

  const { data: words = [], isLoading, error, refetch } = useWords(finalFilters);
  const deleteMutation = useDeleteWord();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key: keyof WordFilters, value: any) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDelete = async (word: Word) => {
    if (window.confirm(`"${word.word}" 단어를 삭제하시겠습니까?`)) {
      try {
        await deleteMutation.mutateAsync(word.rowId);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  // 통계 계산
  const stats = {
    total: words.length,
    unreviewed: words.filter(w => w.status === 'unreviewed').length,
    reviewing: words.filter(w => w.status === 'reviewing').length,
    memorized: words.filter(w => w.status === 'memorized').length,
  };

  if (error) {
    return (
      <div className={wordListErrorStyles()}>
        <svg className="w-12 h-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 className="text-lg font-semibold mb-2">데이터를 불러올 수 없습니다</h3>
        <p className="text-sm mb-4">네트워크 연결을 확인해주세요.</p>
        <Button variant="primary" onClick={() => refetch()}>
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(wordListStyles(), className)}>
      <div className={wordListHeaderStyles()}>
        <div className={wordListTitleStyles()}>
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>나의 단어장</span>
          <span className="text-lg font-normal text-blue-600">({stats.total}개)</span>
        </div>
      </div>

      {/* 통계 카드 */}
      {showStats && (
        <div className={statsRowStyles()}>
          <div className={statCardStyles()}>
            <div className="text-2xl font-bold text-gray-600">{stats.unreviewed}</div>
            <div className="text-sm text-gray-500">미복습</div>
          </div>
          <div className={statCardStyles()}>
            <div className="text-2xl font-bold text-blue-600">{stats.reviewing}</div>
            <div className="text-sm text-gray-500">복습중</div>
          </div>
          <div className={statCardStyles()}>
            <div className="text-2xl font-bold text-green-600">{stats.memorized}</div>
            <div className="text-sm text-gray-500">암기완료</div>
          </div>
        </div>
      )}

      {/* 검색 및 필터 */}
      <div className="mb-6 space-y-4">
        <Input
          placeholder="단어 또는 뜻으로 검색..."
          value={searchTerm}
          onChange={handleSearch}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />

        <div className="w-full h-[3rem] flex gap-2 overflow-x-auto mb-2 justify-center items-center">
          <Button
            variant={!localFilters.box ? "primary" : "ghost"}
            size="xs"
            onClick={() => handleFilterChange('box', undefined)}
          >
            전체
          </Button>
          {[1, 2, 3, 4, 5].map(box => (
            <Button
              key={box}
              variant={localFilters.box === box ? "primary" : "ghost"}
              size="xs"
              onClick={() => handleFilterChange('box', box)}
              className="whitespace-nowrap"
            >
              Box {box}
            </Button>
          ))}
        </div>
      </div>

      {/* 단어 목록 */}
      {words.length === 0 ? (
        <div className={wordListEmptyStyles()}>
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm || localFilters.box ? '검색 결과가 없습니다' : '아직 단어가 없습니다'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || localFilters.box 
              ? '다른 검색어나 필터를 시도해보세요.' 
              : '첫 번째 단어를 추가해보세요!'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {words.map((word, index) => (
            <div 
              key={word.rowId} 
              className="animate-fade-in hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <WordCard
                word={word}
                onEdit={onWordEdit}
                onDelete={handleDelete}
                onClick={onWordClick}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}