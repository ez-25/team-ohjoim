/*
@file ItemExtraImageSection.tsx
@description 상세 페이지에서 추가 이미지들을 수평 스크롤로 표시
*/

'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface Props {
  extraImages: string[];
}

export default function ItemExtraImageSection({ extraImages }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageWidth = 250 + 12;
  const visibleCount = 4;
  const totalWidth = extraImages.length * imageWidth;

  // 휠 → 수평 스크롤
  const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  // 무한 스크롤 처리
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (el.scrollLeft >= totalWidth) {
        el.scrollLeft -= totalWidth;
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [totalWidth]);

  if (!extraImages || extraImages.length === 0) return null;

  return (
    <div className="pt-6 pb-4 space-y-4 min-h-[250px]">
      <p className="text-lg font-semibold">📷 추가 이미지</p>

      <div
        ref={scrollRef}
        onWheel={handleWheelScroll}
        className="flex gap-3 overflow-x-auto scrollbar-hide"
        style={{
          maxWidth: `${imageWidth * visibleCount}px`,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {[...extraImages, ...extraImages].map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`추가 이미지 ${i + 1}`}
            width={250}
            height={250}
            className="rounded-md object-cover border shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
