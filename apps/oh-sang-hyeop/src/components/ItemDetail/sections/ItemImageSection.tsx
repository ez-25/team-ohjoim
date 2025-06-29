/*
@file ItemImageSection.tsx
@description 상세 페이지에서 메인이미지와 아티스트, 날짜, 장소 등의 정보를 표시
*/

import Image from 'next/image';
import { ItemDetailData } from '@/types/item';

export default function ItemImageSection({
  image,
  artist,
  date,
  location,
  type,
}: ItemDetailData) {
  return (
    <div className="w-1/3 space-y-4">
      <Image
        src={image}
        alt={`${artist} 이미지`}
        width={420}
        height={420}
        className="text-gray-800 rounded-md object-cover"
      />
      <div className="text-gray-800 text-xl space-y-2">
        <p><strong>아티스트:</strong> {artist}</p>
        <p><strong>{type === 'concert' ? '날짜' : '출시일'}:</strong> {date}</p>
        {type === 'concert' && location && (
          <p><strong>장소:</strong> {location}</p>
        )}
      </div>
    </div>
  );
}
