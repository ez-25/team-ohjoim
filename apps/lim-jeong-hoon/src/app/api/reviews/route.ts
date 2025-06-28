import { NextRequest, NextResponse } from 'next/server';
import { googleSheetsService } from '../../../services/word/googleSheetsService';
import { ReviewService } from '../../../services/word/reviewService';
import { ReviewRequest } from '../../../types/word';

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: 복습 결과 제출
 *     description: 복습 결과를 제출하고 Leitner 박스 시스템에 따라 단어 상태를 업데이트합니다.
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewRequest'
 *     responses:
 *       200:
 *         description: 복습 결과 저장 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Word'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 단어를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export async function POST(request: NextRequest) {
  try {
    const body: ReviewRequest = await request.json();
    
    if (!body.rowId || typeof body.isCorrect !== 'boolean') {
      return NextResponse.json(
        {
          success: false,
          message: 'rowId와 isCorrect는 필수 항목입니다.',
        },
        { status: 400 }
      );
    }

    const words = await googleSheetsService.getAllWords();
    const word = words.find(w => w.rowId === body.rowId);

    if (!word) {
      return NextResponse.json(
        {
          success: false,
          message: '단어를 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }

    const newConsecutiveCorrect = body.isCorrect 
      ? word.consecutive_correct + 1 
      : 0;

    const { nextBox, nextReviewDate } = ReviewService.calculateNextReviewDate(
      word.box, 
      body.isCorrect
    );

    const newStatus = ReviewService.updateWordStatus(newConsecutiveCorrect);

    const updateData = {
      status: newStatus,
      box: nextBox,
      last_review_date: body.lastReviewDate,
      next_review_date: nextReviewDate,
      consecutive_correct: newConsecutiveCorrect,
    };

    const updatedWord = await googleSheetsService.updateWord(body.rowId, updateData);

    await googleSheetsService.addReviewLog({
      rowId: body.rowId,
      word: word.word,
      isCorrect: body.isCorrect,
      reviewDate: body.lastReviewDate,
      box: nextBox,
    });

    return NextResponse.json({
      success: true,
      data: updatedWord,
      message: '복습 결과 저장 성공',
    });
  } catch (error) {
    console.error('복습 결과 저장 실패:', error);
    return NextResponse.json(
      {
        success: false,
        message: '복습 결과 저장에 실패했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}