export interface Word {
  rowId: number;
  word: string;
  meaning: string;
  example?: string;
  tag: string;
  status: WordStatus;
  added_at: string;
  box: BoxNumber;
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
  status?: WordStatus;
  box?: BoxNumber;
  last_review_date?: string;
  next_review_date?: string;
  consecutive_correct?: number;
}

export interface WordFilters {
  date?: string;
  box?: BoxNumber;
  search?: string;
  filter?: 'review';
}

export interface ReviewRequest {
  rowId: number;
  isCorrect: boolean;
  lastReviewDate: string;
  nextReviewDate: string;
}

export interface ReviewSubmission {
  wordId: number;
  result: ReviewResult;
  timeSpent?: number;
  difficulty?: 'easy' | 'hard';
}

export interface ReviewLogEntry {
  rowId: number;
  word: string;
  result: 'correct' | 'incorrect';
  reviewDate: string;
  box: number;
  timestamp: string;
}

export interface AddReviewLogRequest {
  rowId: number;
  word: string;
  isCorrect: boolean;
  reviewDate: string;
  box: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
}

export interface StatusDistributionData {
  name: '미복습' | '복습중' | '암기완료';
  y: number;
}

export interface DailyWordCountData {
  date: string;
  count: number;
}

export interface StatsData {
  statusData: StatusDistributionData[];
  dailyData: DailyWordCountData[];
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data: Word;
}

export type WordResponse = ApiResponse<Word>;
export type WordListResponse = ApiResponse<Word[]>;
export type StatsResponse = ApiResponse<StatsData>;
export type CreateWordResponse = ApiResponse<Word>;
export type UpdateWordResponse = ApiResponse<Word>;
export type DeleteWordResponse = ApiResponse<{ rowId: number }>;

export type WordStatus = 'unreviewed' | 'reviewing' | 'memorized';
export type ReviewResult = 'correct' | 'incorrect';
export type BoxNumber = 1 | 2 | 3 | 4 | 5;

export interface WordWithValidation extends Word {
  isValid: boolean;
  validationErrors?: string[];
}