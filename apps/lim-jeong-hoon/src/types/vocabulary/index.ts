export interface VocabularyCategory {
  id: string;
  name: string;
  description?: string;
  wordCount: number;
}

export interface VocabularyWord {
  id: string;
  word: string;
  meaning: string;
  pronunciation?: string;
  categoryId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  example?: string;
  imageUrl?: string;
  learned: boolean;
  createdAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface CreateWordRequest {
  word: string;
  meaning: string;
  pronunciation?: string;
  categoryId: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  example?: string;
  imageUrl?: string;
}

export interface UpdateWordRequest extends Partial<CreateWordRequest> {
  learned?: boolean;
}

export interface WordFilters {
  categoryId?: string;
  search?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  learned?: boolean;
}