import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '외우자영단어 API',
    version: '1.0.0',
    description: '구글 시트 기반 영단어 학습 애플리케이션 API',
    contact: {
      name: 'API Support',
      email: 'support@example.com',
    },
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.com' 
        : 'http://localhost:3000',
      description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
    },
  ],
  components: {
    schemas: {
      Word: {
        type: 'object',
        required: ['rowId', 'word', 'meaning', 'tag', 'status', 'added_at', 'box', 'consecutive_correct'],
        properties: {
          rowId: {
            type: 'integer',
            description: '시트 행 번호',
            example: 2,
          },
          word: {
            type: 'string',
            description: '영어 단어',
            example: 'apple',
          },
          meaning: {
            type: 'string',
            description: '한국어 뜻',
            example: '사과',
          },
          example: {
            type: 'string',
            description: '예문',
            example: 'I like apple.',
          },
          tag: {
            type: 'string',
            description: '태그/카테고리',
            example: '명사',
          },
          status: {
            type: 'string',
            enum: ['unreviewed', 'reviewing', 'memorized'],
            description: '학습 상태',
            example: 'reviewing',
          },
          added_at: {
            type: 'string',
            format: 'date-time',
            description: '등록일',
            example: '2025-06-26T10:00:00Z',
          },
          box: {
            type: 'integer',
            minimum: 1,
            maximum: 5,
            description: 'Leitner Box 번호',
            example: 2,
          },
          last_review_date: {
            type: 'string',
            format: 'date',
            description: '마지막 복습일',
            example: '2025-06-26',
          },
          next_review_date: {
            type: 'string',
            format: 'date',
            description: '다음 복습 예정일',
            example: '2025-06-29',
          },
          consecutive_correct: {
            type: 'integer',
            minimum: 0,
            description: '연속 정답 횟수',
            example: 2,
          },
        },
      },
      CreateWordRequest: {
        type: 'object',
        required: ['word', 'meaning', 'tag'],
        properties: {
          word: {
            type: 'string',
            description: '영어 단어',
            example: 'apple',
          },
          meaning: {
            type: 'string',
            description: '한국어 뜻',
            example: '사과',
          },
          example: {
            type: 'string',
            description: '예문',
            example: 'I like apple.',
          },
          tag: {
            type: 'string',
            description: '태그/카테고리',
            example: '명사',
          },
        },
      },
      UpdateWordRequest: {
        type: 'object',
        properties: {
          word: {
            type: 'string',
            description: '영어 단어',
          },
          meaning: {
            type: 'string',
            description: '한국어 뜻',
          },
          example: {
            type: 'string',
            description: '예문',
          },
          tag: {
            type: 'string',
            description: '태그/카테고리',
          },
          status: {
            type: 'string',
            enum: ['unreviewed', 'reviewing', 'memorized'],
            description: '학습 상태',
          },
          box: {
            type: 'integer',
            minimum: 1,
            maximum: 5,
            description: 'Leitner Box 번호',
          },
          last_review_date: {
            type: 'string',
            format: 'date',
            description: '마지막 복습일',
          },
          next_review_date: {
            type: 'string',
            format: 'date',
            description: '다음 복습 예정일',
          },
          consecutive_correct: {
            type: 'integer',
            minimum: 0,
            description: '연속 정답 횟수',
          },
        },
      },
      ReviewRequest: {
        type: 'object',
        required: ['rowId', 'isCorrect', 'lastReviewDate', 'nextReviewDate'],
        properties: {
          rowId: {
            type: 'integer',
            description: '복습할 단어의 행 ID',
            example: 2,
          },
          isCorrect: {
            type: 'boolean',
            description: '정답 여부',
            example: true,
          },
          lastReviewDate: {
            type: 'string',
            format: 'date',
            description: '복습 일자',
            example: '2025-06-26',
          },
          nextReviewDate: {
            type: 'string',
            format: 'date',
            description: '다음 복습 예정일',
            example: '2025-06-29',
          },
        },
      },
      StatsData: {
        type: 'object',
        properties: {
          statusData: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: '미복습',
                },
                y: {
                  type: 'integer',
                  example: 10,
                },
              },
            },
          },
          dailyData: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                date: {
                  type: 'string',
                  format: 'date',
                  example: '2025-06-26',
                },
                count: {
                  type: 'integer',
                  example: 5,
                },
              },
            },
          },
        },
      },
      ApiResponse: {
        type: 'object',
        required: ['success'],
        properties: {
          success: {
            type: 'boolean',
            description: '성공 여부',
          },
          data: {
            description: '응답 데이터',
          },
          message: {
            type: 'string',
            description: '응답 메시지',
          },
          error: {
            type: 'string',
            description: '에러 메시지',
          },
        },
      },
      Error: {
        type: 'object',
        required: ['success', 'message'],
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: '에러가 발생했습니다.',
          },
          error: {
            type: 'string',
            example: 'Detailed error message',
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/app/api/**/*.ts'], // API 파일 경로
};

export const swaggerSpec = swaggerJSDoc(options);