/*
@file BookLayout.tsx
@description 책 레이아웃 컴포넌트로, 왼쪽에 사이드바를 고정하고, 오른쪽에 책 펼침 화면을 표시합니다.
*/
'use client';

import { Button } from '@mui/material';
import Sidebar from '@/components/sidebar/sidebar';

type BookType = 'concert' | 'album' | 'goods';

interface BookLayoutProps {
  title: string;
  type: BookType;
  onCreate: () => void;
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
}

const getCreateButtonLabel = (type: BookType) => {
  switch (type) {
    case 'concert':
      return '티켓 추가';
    case 'album':
      return '앨범 추가';
    case 'goods':
      return '굿즈 추가';
    default:
      return '항목 추가';
  }
};

export default function BookLayout({
  title,
  type,
  onCreate,
  leftPage,
  rightPage,
}: BookLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#f8f6f2]">
      {/* Sidebar */}
      <Sidebar />

      {/* 책 본문 영역 */}
      <div className="flex-1 flex flex-col justify-center items-center py-10">
        {/* 상단 헤더 */}
        <div className="w-full max-w-6xl flex justify-between items-center mb-6 px-4">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <Button variant="contained" onClick={onCreate}>
            {getCreateButtonLabel(type)}
          </Button>
        </div>

        {/* 펼쳐진 책 구조 */}
        <div className="relative w-[1200px] h-[600px] flex shadow-lg rounded-xl overflow-hidden">
          {/* 왼쪽 페이지 */}
          <div className="w-1/2 bg-white p-6 overflow-y-auto border-r border-gray-300">
            {leftPage}
          </div>

          {/* 중앙 접힘 */}
          <div className="w-[6px] bg-gradient-to-b from-gray-300 via-gray-100 to-gray-300 shadow-inner" />

          {/* 오른쪽 페이지 */}
          <div className="w-1/2 bg-white p-6 overflow-y-auto">
            {rightPage}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 테스트 코드
'use client';

import BookLayout from '@/components/book/BookLayout';

export default function BookLayoutPreviewPage() {
  return (
    <BookLayout
      title="디자인 미리보기"
      type="concert"
      onCreate={() => alert('버튼 클릭')}
      leftPage={
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          👉 왼쪽 페이지
        </div>
      }
      rightPage={
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          👉 오른쪽 페이지
        </div>
      }
    />
  );
}
*/
