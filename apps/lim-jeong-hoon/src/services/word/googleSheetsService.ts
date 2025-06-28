import { google } from 'googleapis';
import { Word } from '../../types/word';

const SPREADSHEET_ID = process.env.NEXT_GOOGLE_SHEETS_ID;
const WORDS_RANGE = 'Words!A:K';

interface SheetsCredentials {
  client_email: string;
  private_key: string;
}

class GoogleSheetsService {
  private sheets: any;
  private auth: any;

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    try {
      const credentials: SheetsCredentials = {
        client_email: process.env.NEXT_GOOGLE_SHEETS_CLIENT_EMAIL!,
        private_key: process.env.NEXT_GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      };

      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    } catch (error) {
      console.error('Google Sheets 인증 초기화 실패:', error);
      throw error;
    }
  }

  async getAllWords(): Promise<Word[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: WORDS_RANGE,
      });

      const rows = response.data.values || [];
      if (rows.length === 0) return [];

      const dataRows = rows.slice(1);

      return dataRows.map((row: any[], index: number) => ({
        rowId: index + 2,
        word: row[0] || '',
        meaning: row[1] || '',
        example: row[2] || '',
        tag: row[3] || '',
        status: (row[4] as Word['status']) || 'unreviewed',
        added_at: row[5] || new Date().toISOString(),
        box: parseInt(row[6]) || 1,
        last_review_date: row[7] || '',
        next_review_date: row[8] || '',
        consecutive_correct: parseInt(row[9]) || 0,
      }));
    } catch (error) {
      console.error('단어 목록 조회 실패:', error);
      throw error;
    }
  }

  async addWord(wordData: {
    word: string;
    meaning: string;
    example?: string;
    tag: string;
  }): Promise<Word> {
    try {
      const newRow = [
        wordData.word,
        wordData.meaning,
        wordData.example || '',
        wordData.tag,
        'unreviewed',
        new Date().toISOString(),
        1,
        '',
        '',
        0,
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Words!A:K',
        valueInputOption: 'RAW',
        requestBody: {
          values: [newRow],
        },
      });

      const allWords = await this.getAllWords();
      const newWord = allWords[allWords.length - 1];
      if (!newWord) {
        throw new Error('새로 추가된 단어를 찾을 수 없습니다.');
      }
      return newWord;
    } catch (error) {
      console.error('단어 추가 실패:', error);
      throw error;
    }
  }

  async updateWord(rowId: number, updateData: Partial<Word>): Promise<Word> {
    try {
      const allWords = await this.getAllWords();
      const existingWord = allWords.find(word => word.rowId === rowId);
      
      if (!existingWord) {
        throw new Error('단어를 찾을 수 없습니다.');
      }

      const updatedWord = { ...existingWord, ...updateData };
      
      const updatedRow = [
        updatedWord.word,
        updatedWord.meaning,
        updatedWord.example || '',
        updatedWord.tag,
        updatedWord.status,
        updatedWord.added_at,
        updatedWord.box,
        updatedWord.last_review_date || '',
        updatedWord.next_review_date || '',
        updatedWord.consecutive_correct,
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Words!A${rowId}:K${rowId}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [updatedRow],
        },
      });

      return updatedWord;
    } catch (error) {
      console.error('단어 수정 실패:', error);
      throw error;
    }
  }

  async deleteWord(rowId: number): Promise<void> {
    try {
      await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              deleteDimension: {
                range: {
                  sheetId: 0,
                  dimension: 'ROWS',
                  startIndex: rowId - 1,
                  endIndex: rowId,
                },
              },
            },
          ],
        },
      });
    } catch (error) {
      console.error('단어 삭제 실패:', error);
      throw error;
    }
  }

  async addReviewLog(reviewData: {
    rowId: number;
    word: string;
    isCorrect: boolean;
    reviewDate: string;
    box: number;
  }): Promise<void> {
    try {
      const logRow = [
        reviewData.rowId,
        reviewData.word,
        reviewData.isCorrect ? 'correct' : 'incorrect',
        reviewData.reviewDate,
        reviewData.box,
        new Date().toISOString(),
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'ReviewLog!A:F',
        valueInputOption: 'RAW',
        requestBody: {
          values: [logRow],
        },
      });
    } catch (error) {
      console.error('복습 로그 추가 실패:', error);
      throw error;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();