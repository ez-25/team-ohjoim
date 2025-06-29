import { NextRequest, NextResponse } from 'next/server';
import { googleSheetsService } from '../../../services/word/googleSheetsService';
import { ReviewService } from '../../../services/word/reviewService';

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: 학습 통계 조회
 *     description: 단어 학습 상태 분포와 일별 학습 통계를 조회합니다.
 *     tags: [Statistics]
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: 조회할 필드 (status, added_at)
 *         example: "status,added_at"
 *     responses:
 *       200:
 *         description: 통계 데이터 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/StatsData'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fields = searchParams.get('fields');

    const words = await googleSheetsService.getAllWords();

    let responseData: any = {};

    if (!fields || fields.includes('status')) {
      responseData.statusData = ReviewService.getStatusDistribution(words);
    }

    if (!fields || fields.includes('added_at')) {
      responseData.dailyData = ReviewService.getDailyWordCount(words);
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      message: '통계 데이터 조회 성공',
    });
  } catch (error) {
    console.error('통계 데이터 조회 실패:', error);
    return NextResponse.json(
      {
        success: false,
        message: '통계 데이터 조회에 실패했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}