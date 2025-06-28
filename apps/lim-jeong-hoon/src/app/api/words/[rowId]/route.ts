import { NextRequest, NextResponse } from 'next/server';
import { googleSheetsService } from '../../../../services/word/googleSheetsService';
import { UpdateWordRequest } from '../../../../types/word';

/**
 * @swagger
 * /api/words/{rowId}:
 *   get:
 *     summary: 특정 단어 조회
 *     description: 행 ID로 특정 단어의 상세 정보를 조회합니다.
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: rowId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 단어의 행 ID
 *         example: 2
 *     responses:
 *       200:
 *         description: 단어 조회 성공
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
 *         description: 잘못된 행 ID
 *       404:
 *         description: 단어를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 *   put:
 *     summary: 단어 수정
 *     description: 행 ID로 특정 단어를 수정합니다.
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: rowId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 단어의 행 ID
 *         example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWordRequest'
 *     responses:
 *       200:
 *         description: 단어 수정 성공
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
 *       404:
 *         description: 단어를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 *   delete:
 *     summary: 단어 삭제
 *     description: 행 ID로 특정 단어를 삭제합니다.
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: rowId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 단어의 행 ID
 *         example: 2
 *     responses:
 *       200:
 *         description: 단어 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: 잘못된 행 ID
 *       404:
 *         description: 단어를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { rowId: string } }
) {
  try {
    const rowId = parseInt(params.rowId);
    if (isNaN(rowId)) {
      return NextResponse.json(
        {
          success: false,
          message: '유효하지 않은 행 ID입니다.',
        },
        { status: 400 }
      );
    }

    const words = await googleSheetsService.getAllWords();
    const word = words.find(w => w.rowId === rowId);

    if (!word) {
      return NextResponse.json(
        {
          success: false,
          message: '단어를 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: word,
      message: '단어 조회 성공',
    });
  } catch (error) {
    console.error('단어 조회 실패:', error);
    return NextResponse.json(
      {
        success: false,
        message: '단어 조회에 실패했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { rowId: string } }
) {
  try {
    const rowId = parseInt(params.rowId);
    if (isNaN(rowId)) {
      return NextResponse.json(
        {
          success: false,
          message: '유효하지 않은 행 ID입니다.',
        },
        { status: 400 }
      );
    }

    const body: UpdateWordRequest = await request.json();
    const updatedWord = await googleSheetsService.updateWord(rowId, body);

    return NextResponse.json({
      success: true,
      data: updatedWord,
      message: '단어 수정 성공',
    });
  } catch (error) {
    console.error('단어 수정 실패:', error);
    return NextResponse.json(
      {
        success: false,
        message: '단어 수정에 실패했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { rowId: string } }
) {
  try {
    const rowId = parseInt(params.rowId);
    if (isNaN(rowId)) {
      return NextResponse.json(
        {
          success: false,
          message: '유효하지 않은 행 ID입니다.',
        },
        { status: 400 }
      );
    }

    await googleSheetsService.deleteWord(rowId);

    return NextResponse.json({
      success: true,
      message: '단어 삭제 성공',
    });
  } catch (error) {
    console.error('단어 삭제 실패:', error);
    return NextResponse.json(
      {
        success: false,
        message: '단어 삭제에 실패했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}