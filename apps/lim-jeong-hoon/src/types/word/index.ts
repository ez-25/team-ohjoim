export interface Word {
  rowId: number;
  word: string;
  meaning: string;
  example?: string;
  tag: string;
  status: 'unreviewed' | 'reviewing' | 'memorized';
  added_at: string;
  box: number;
  last_review_date?: string;
  next_review_date?: string;
  consecutive_correct: number;
}

export interface CreateWordRequest {
  word: string;
  meaning: string;
  example?: string;
  tag: string;
}

export interface UpdateWordRequest extends Partial<CreateWordRequest> {
  status?: 'unreviewed' | 'reviewing' | 'memorized';
  box?: number;
  last_review_date?: string;
  next_review_date?: string;
  consecutive_correct?: number;
}

export interface WordFilters {
  date?: string;
  box?: number;
  search?: string;
  filter?: 'review';
}

export interface ReviewRequest {
  rowId: number;
  isCorrect: boolean;
  lastReviewDate: string;
  nextReviewDate: string;
}

export interface StatsData {
  statusData: {
    name: string;
    y: number;
  }[];
  dailyData: {
    date: string;
    count: number;
  }[];
}