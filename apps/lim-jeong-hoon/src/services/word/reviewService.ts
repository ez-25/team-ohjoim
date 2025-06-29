import { Word } from '../../types/word';

export class ReviewService {
  static calculateNextReviewDate(currentBox: number, isCorrect: boolean): {
    nextBox: number;
    nextReviewDate: string;
  } {
    const today = new Date();
    let nextBox = currentBox;
    let daysToAdd = 0;

    if (isCorrect) {
      switch (currentBox) {
        case 1:
          nextBox = 2;
          daysToAdd = 1;
          break;
        case 2:
          nextBox = 3;
          daysToAdd = 3;
          break;
        case 3:
          nextBox = 4;
          daysToAdd = 7;
          break;
        case 4:
          nextBox = 5;
          daysToAdd = 14;
          break;
        case 5:
          nextBox = 5;
          daysToAdd = 30;
          break;
        default:
          nextBox = 1;
          daysToAdd = 1;
      }
    } else {
      nextBox = 1;
      daysToAdd = 1;
    }

    const nextReviewDate = new Date(today);
    nextReviewDate.setDate(today.getDate() + daysToAdd);
    
    return {
      nextBox,
      nextReviewDate: nextReviewDate.toISOString().split('T')[0] as string,
    };
  }

  static updateWordStatus(consecutiveCorrect: number): Word['status'] {
    if (consecutiveCorrect >= 5) {
      return 'memorized';
    } else if (consecutiveCorrect > 0) {
      return 'reviewing';
    } else {
      return 'unreviewed';
    }
  }

  static getReviewWords(words: Word[]): Word[] {
    const today: string = new Date().toISOString().split('T')[0] || '2000-10-30';
    
    return words.filter(word => {
      if (!word.next_review_date) return true;
      return word.next_review_date !== undefined && word.next_review_date <= today;
    });
  }

  static filterWordsByDate(words: Word[], date: string): Word[] {
    return words.filter(word => {
      if (!word.added_at) return false;
      const addedDate = word.added_at.split('T')[0];
      return addedDate === date;
    });
  }

  static filterWordsByBox(words: Word[], box: number): Word[] {
    return words.filter(word => word.box === box);
  }

  static searchWords(words: Word[], keyword: string): Word[] {
    const searchTerm = keyword.toLowerCase();
    return words.filter(word => 
      word.word.toLowerCase().includes(searchTerm) ||
      word.meaning.toLowerCase().includes(searchTerm) ||
      (word.example && word.example.toLowerCase().includes(searchTerm))
    );
  }

  static getStatusDistribution(words: Word[]) {
    const statusCount = {
      unreviewed: 0,
      reviewing: 0,
      memorized: 0,
    };

    words.forEach(word => {
      statusCount[word.status]++;
    });

    return [
      { name: '미복습', y: statusCount.unreviewed },
      { name: '복습중', y: statusCount.reviewing },
      { name: '암기완료', y: statusCount.memorized },
    ];
  }

  static getDailyWordCount(words: Word[]) {
    const dailyCount: { [key: string]: number } = {};

    words.forEach(word => {
      if (!word.added_at) return;
      const date = word.added_at.split('T')[0];
      if (date) {
        dailyCount[date] = (dailyCount[date] || 0) + 1;
      }
    });

    return Object.entries(dailyCount)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }
}