import { NextRequest, NextResponse } from 'next/server';
import { googleSheetsService } from '../../../services/word/googleSheetsService';
import { ReviewService } from '../../../services/word/reviewService';
import { WordFilters, CreateWordRequest, BoxNumber } from '../../../types/word';

/**
 * @swagger
 * /api/words:
 *   get:
 *     summary: 단어 목록 조회
 *     description: 구글 시트에서 단어 목록을 조회하며 다양한 필터링 옵션을 제공합니다.
 *     tags: [Words]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: 입력일 필터 (YYYY-MM-DD)
 *         example: "2025-06-26"
 *       - in: query
 *         name: box
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         description: 박스 번호 필터
 *         example: 2
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 단어·뜻 검색 키워드
 *         example: "apple"
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [review]
 *         description: 복습 대상만 조회
 *         example: "review"
 *     responses:
 *       200:
 *         description: 단어 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Word'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: 새 단어 등록
 *     description: 구글 시트에 새로운 단어를 추가합니다.
 *     tags: [Words]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWordRequest'
 *     responses:
 *       200:
 *         description: 단어 등록 성공
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
    const boxParam = searchParams.get('box');
    const filters: WordFilters = {
      date: searchParams.get('date') || undefined,
      box: boxParam ? parseInt(boxParam) as BoxNumber : undefined,
      search: searchParams.get('search') || undefined,
      filter: searchParams.get('filter') as 'review' || undefined,
    };

    let words = await googleSheetsService.getAllWords();

    if (filters.date) {
      words = ReviewService.filterWordsByDate(words, filters.date);
    }

    if (filters.box) {
      words = ReviewService.filterWordsByBox(words, filters.box);
    }

    if (filters.search) {
      words = ReviewService.searchWords(words, filters.search);
    }

    if (filters.filter === 'review') {
      words = ReviewService.getReviewWords(words);
    }

    return NextResponse.json({
      success: true,
      data: words,
      message: '단어 목록 조회 성공',
    });
  } catch (error) {
    console.error('단어 목록 조회 실패:', error);
    return NextResponse.json(
      {
        success: false,
        message: '단어 목록 조회에 실패했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateWordRequest = await request.json();
    
    if (!body.word || !body.meaning || !body.tag) {
      return NextResponse.json(
        {
          success: false,
          message: '단어, 뜻, 태그는 필수 입력 항목입니다.',
        },
        { status: 400 }
      );
    }

    const newWord = await googleSheetsService.addWord(body);

    return NextResponse.json({
      success: true,
      data: newWord,
      message: '단어 등록 성공',
    });
  } catch (error) {
    console.error('단어 등록 실패:', error);
    return NextResponse.json(
      {
        success: false,
        message: '단어 등록에 실패했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}