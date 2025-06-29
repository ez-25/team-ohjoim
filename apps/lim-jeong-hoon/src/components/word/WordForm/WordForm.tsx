'use client';

import { useState, useEffect } from 'react';
import { cn } from "@/utils/cn";
import { Button, Input } from "@/components/ui";
import { useCreateWord, useUpdateWord } from "@/hooks/word";
import type { Word, CreateWordRequest, UpdateWordRequest } from "@/types/word";
import { 
  wordFormStyles, 
  formRowStyles, 
  formActionsStyles, 
  formTitleStyles 
} from "./WordForm.styles";

interface WordFormProps {
  word?: Word; // 수정 모드일 때 전달
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

export function WordForm({ word, onSuccess, onCancel, className }: WordFormProps) {
  const [formData, setFormData] = useState({
    word: '',
    meaning: '',
    example: '',
    tag: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const createMutation = useCreateWord();
  const updateMutation = useUpdateWord();

  const isEditing = !!word;
  const isLoading = createMutation.isPending || updateMutation.isPending;

  // 수정 모드일 때 기존 데이터로 폼 초기화
  useEffect(() => {
    if (word) {
      setFormData({
        word: word.word,
        meaning: word.meaning,
        example: word.example || '',
        tag: word.tag,
      });
    }
  }, [word]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.word.trim()) {
      newErrors.word = '영어 단어를 입력해주세요.';
    }

    if (!formData.meaning.trim()) {
      newErrors.meaning = '뜻을 입력해주세요.';
    }

    if (!formData.tag.trim()) {
      newErrors.tag = '태그를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditing && word) {
        const updateData: UpdateWordRequest = {
          word: formData.word.trim(),
          meaning: formData.meaning.trim(),
          example: formData.example.trim() || undefined,
          tag: formData.tag.trim(),
        };
        
        await updateMutation.mutateAsync({ 
          rowId: word.rowId, 
          word: updateData 
        });
      } else {
        const createData: CreateWordRequest = {
          word: formData.word.trim(),
          meaning: formData.meaning.trim(),
          example: formData.example.trim() || undefined,
          tag: formData.tag.trim(),
        };
        
        await createMutation.mutateAsync(createData);
      }

      // 성공 시 폼 초기화
      if (!isEditing) {
        setFormData({
          word: '',
          meaning: '',
          example: '',
          tag: '',
        });
      }
      
      setErrors({});
      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    // 입력 시 해당 필드 에러 제거
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(wordFormStyles(), className)}
    >
      <h2 className={formTitleStyles()}>
        {isEditing ? '단어 수정' : '새 단어 추가'}
      </h2>

      <div className={formRowStyles({ formLayout: "responsive" })}>
        <Input
          label="영어 단어 *"
          value={formData.word}
          onChange={handleChange('word')}
          error={errors.word}
          placeholder="예: apple"
          disabled={isLoading}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          }
        />

        <Input
          label="뜻 *"
          value={formData.meaning}
          onChange={handleChange('meaning')}
          error={errors.meaning}
          placeholder="예: 사과"
          disabled={isLoading}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          }
        />
      </div>

      <Input
        label="예문"
        value={formData.example}
        onChange={handleChange('example')}
        placeholder="예: I like apple."
        disabled={isLoading}
        leftIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        }
      />

      <Input
        label="태그 *"
        value={formData.tag}
        onChange={handleChange('tag')}
        error={errors.tag}
        placeholder="예: 명사, 동사, 형용사"
        disabled={isLoading}
        leftIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        }
      />

      <div className={formActionsStyles()}>
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
          >
            취소
          </Button>
        )}
        
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        >
          {isEditing ? '수정하기' : '추가하기'}
        </Button>
      </div>
    </form>
  );
}