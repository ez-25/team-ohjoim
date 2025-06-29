# 외우자영단어 (Let's Memorize English Words)

**Leitner Box 시스템을 활용한 지능형 영어 단어 암기 애플리케이션**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-5.81.5-FF4154?logo=react-query)](https://tanstack.com/query/latest)

## 📖 프로젝트 개요

**외우자영단어**는 영어 단어 암기 애플리케이션으로 Google Sheets를 데이터베이스로 활용하여 클라우드 기반의 안정적인 학습 환경을 제공하며, 사용자의 학습 패턴을 분석하여 최적의 복습 스케줄을 제공합니다.

## ✨ 주요 기능

### 🔍 **스마트 단어 관리**
- **단어 등록/수정/삭제**: 직관적인 UI로 단어 데이터베이스 관리
- **필터링**: 날짜별, Box별, 학습 상태별 필터링
- **실시간 검색**: 단어와 뜻을 동시에 검색하는 통합 검색

### 🧠 **Box 복습 시스템**
```
Box 1: 1일 후 → Box 2: 3일 후 → Box 3: 7일 후 → Box 4: 14일 후 → Box 5: 30일 후
```
- **적응형 스케줄링**: 정답률에 따른 동적 복습 주기 조정
- **연속 정답 추적**: 학습자의 숙련도를 정확히 측정
- **자동 상태 관리**: 미복습 → 복습중 → 암기완료 자동 전환

### 📊 **학습 분석 대시보드**
- **상태 분포 원형차트**: 전체 학습 진도를 시각적으로 표시
- **일별 학습량 그래프**: 학습 패턴과 일관성 추적

## 🏗️ 기술 아키텍처

### **Frontend Stack**
- **Framework**: Next.js 15.3.4 (App Router)
- **Language**: TypeScript 5.8.2
- **Styling**: TailwindCSS 4.0 + CVA (Class Variance Authority)
- **State Management**: React Query 5.81.5 + Zustand
- **Charts**: Highcharts 12.3.0 (packages/ui의 CircularChart 컴포넌트)
- **Forms**: React Hook Form 7.59.0
- **Notifications**: React Hot Toast

### **Backend Stack**
- **Runtime**: Next.js API Routes (서버리스)
- **Database**: Google Sheets API (클라우드 스프레드시트)
- **Authentication**: Google Service Account
- **API Documentation**: Swagger/OpenAPI 3.0

### **Development Tools**
- **Monorepo**: Turborepo + pnpm workspace
- **Code Quality**: ESLint + Prettier + TypeScript strict mode
- **Build System**: Turbo build pipeline
- **Development**: Hot reload + TypeScript incremental compilation

## 📁 프로젝트 구조

```
apps/lim-jeong-hoon/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # 백엔드 API 엔드포인트
│   │   │   ├── words/         # 단어 CRUD API
│   │   │   ├── reviews/       # 복습 결과 처리 API
│   │   │   ├── stats/         # 통계 데이터 API
│   │   │   └── docs/          # Swagger API 문서
│   │   ├── words/             # 단어 관리 페이지
│   │   ├── review/            # 복습 테스트 페이지
│   │   ├── stats/             # 학습 통계 페이지
│   │   └── test/              # API 테스트 페이지
│   ├── components/            # 재사용 가능한 UI 컴포넌트
│   │   ├── ui/               # 기본 UI 컴포넌트 (Button, Input 등)
│   │   ├── word/             # 단어 관련 컴포넌트
│   │   ├── review/           # 복습 관련 컴포넌트
│   │   ├── stats/            # 통계 관련 컴포넌트
│   │   ├── layouts/          # 레이아웃 컴포넌트
│   │   └── providers/        # Context Providers
│   ├── hooks/                # 커스텀 React 훅
│   │   └── word/             # 단어 관련 비즈니스 로직
│   ├── services/             # 백엔드 비즈니스 로직
│   │   └── word/             # Google Sheets 서비스
│   ├── types/                # TypeScript 타입 정의
│   │   ├── word/             # 단어 관련 타입
│   │   └── tailwind/         # 스타일링 시스템 타입
│   ├── utils/                # 유틸리티 함수
│   │   ├── cn.ts             # 클래스명 병합 유틸리티
│   │   └── tailwindHelper.ts # TailwindCSS 헬퍼
│   └── styles/               # 글로벌 스타일
├── packages/                 # 공유 패키지 (Monorepo)
│   ├── api/                  # API 클라이언트 공통 모듈 (오류로 인해 미사용)
│   └── ui/                   # 공유 UI 컴포넌트
└── docs/                     # 프로젝트 문서
```

## 🗃️ 데이터 구조

### Google Sheets 스키마
(https://docs.google.com/spreadsheets/d/1zbwUa6kHPduVUL9wsJB4Y28K9YTMp9i-z7cqK2Mq92s/edit?gid=0#gid=0)

프로젝트용 .env.local 다운로드
(https://drive.google.com/drive/folders/1dLLogmDoN8GfajdZ6qX4HBFBm-2Fulox)

| 컬럼 | 필드명 | 타입 | 설명 | 예시 |
|------|--------|------|------|------|
| A | word | string | 영어 단어 | "apple" |
| B | meaning | string | 한국어 뜻 | "사과" |
| C | example | string | 예문 (선택) | "I like apple." |
| D | tag | string | 품사/카테고리 | "명사" |
| E | status | enum | 학습 상태 | "unreviewed" \| "reviewing" \| "memorized" |
| F | added_at | ISO 8601 | 등록 일시 | "2025-06-26T10:00:00Z" |
| G | box | 1-5 | Leitner Box 번호 | 2 |
| H | last_review_date | YYYY-MM-DD | 마지막 복습일 | "2025-06-26" |
| I | next_review_date | YYYY-MM-DD | 다음 복습 예정일 | "2025-06-29" |
| J | consecutive_correct | number | 연속 정답 횟수 | 3 |

### Leitner Box 복습 시스템 로직

```typescript
// 복습 간격 계산
const getNextReviewDate = (box: number, isCorrect: boolean) => {
  const intervals = [1, 3, 7, 14, 30]; // 일 단위
  
  if (isCorrect) {
    // 정답: 다음 박스로 이동
    const nextBox = Math.min(box + 1, 5);
    const daysToAdd = intervals[nextBox - 1];
    return addDays(new Date(), daysToAdd);
  } else {
    // 오답: Box 1로 복귀
    return addDays(new Date(), intervals[0]);
  }
};
```

## 🎨 스타일링 시스템

### **Design System Architecture**

TailwindCSS와 CVA, clsx, twmerge 플러그인을 사용해 스타일링

## 🚀 시작하기

### **Prerequisites**

- Node.js 18.0.0 이상
- pnpm 9.0.0 (권장 패키지 매니저)

### **설치 및 실행**

1. **환경 변수 설정**
.env.local 다운로드
(https://drive.google.com/drive/folders/1dLLogmDoN8GfajdZ6qX4HBFBm-2Fulox)

2. **개발 서버 실행**
```bash
# 전체 모노레포 실행
pnpm dev

# 특정 앱만 실행
pnpm dev --filter lim-jeong-hoon
```

## 🧪 테스트

### **API 테스트**
내장된 테스트 페이지를 통해 API 기능을 확인할 수 있습니다:

- **API 문서**: `http://localhost:3000/docs` (Swagger UI)

```
