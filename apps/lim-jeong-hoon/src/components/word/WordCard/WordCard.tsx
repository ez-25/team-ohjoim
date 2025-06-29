'use client';

import { Button } from "@/components/ui";
import type { Word } from "@/types/word";
import { cn } from "@/utils/cn";
import { useState } from 'react';
import {
  wordBadgeStyles,
  wordCardStyles,
  wordExampleStyles,
  wordMainStyles,
  wordMeaningStyles,
  wordMetaStyles,
  wordTextStyles
} from "./WordCard.styles";

interface WordCardProps {
  word: Word;
  onEdit?: (word: Word) => void;
  onDelete?: (word: Word) => void;
  onClick?: (word: Word) => void;
  showActions?: boolean;
  className?: string;
}

const statusLabels = {
  unreviewed: '미복습',
  reviewing: '복습중',
  memorized: '암기완료',
};

export function WordCard({ 
  word, 
  onEdit, 
  onDelete, 
  onClick,
  showActions = true,
  className 
}: WordCardProps) {
  const [showActionsState, setShowActionsState] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(word);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(word);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(word);
    }
  };

  return (
    <div
      className={cn(
        wordCardStyles({ 
          wordStatus: word.status,
          wordSize: "default" 
        }),
        className
      )}
      onClick={handleCardClick}
      onMouseEnter={() => setShowActionsState(true)}
      onMouseLeave={() => setShowActionsState(false)}
    >
      <div className={wordMainStyles()}>
        <div className="flex-1">
          <h3 className={wordTextStyles()}>{word.word}</h3>
          <p className={wordMeaningStyles()}>{word.meaning}</p>
        </div>
        
        {showActionsState && showActions && (
          <div className="flex gap-2 animate-slide-in-right">
            {onEdit && (
              <Button
                variant="ghost"
                size="xs"
                onClick={handleEdit}
                leftIcon={
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                }
              >
                수정
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                size="xs"
                onClick={handleDelete}
                leftIcon={
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                }
              >
                삭제
              </Button>
            )}
          </div>
        )}
      </div>

      {word.example && (
        <div className={wordExampleStyles()}>
          &quot;{word.example}&quot;
        </div>
      )}

      <div className={wordMetaStyles()}>
        <div className="flex gap-2">
          <span className={wordBadgeStyles({ 
            badgeType: "status",
            statusType: word.status 
          })}>
            {statusLabels[word.status]}
          </span>
          
          <span className={wordBadgeStyles({ badgeType: "box" })}>
            Box {word.box}
          </span>
          
          <span className={wordBadgeStyles({ badgeType: "tag" })}>
            {word.tag}
          </span>
        </div>

        <div className="text-xs text-gray-400">
          {word.consecutive_correct > 0 && (
            <span className="mr-2">
              🔥 {word.consecutive_correct}연속
            </span>
          )}
          {new Date(word.added_at).toLocaleDateString('ko-KR')}
        </div>
      </div>
    </div>
  );
}