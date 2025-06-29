import { ItemDetailData } from '@/types/item';
import ItemImageSection from './sections/ItemImageSection';
import ItemInfoSection from './sections/ItemInfoSection';
import ItemExtraImageSection from './sections/ItemExtraImageSection';

export default function ItemDetail(props: ItemDetailData) {
  return (
    <div className="flex gap-10 p-10 border rounded-2xl shadow-md w-full">
      <ItemImageSection {...props} />
      <div className="flex-1 flex flex-col justify-between">
        <ItemInfoSection {...props} />
        <ItemExtraImageSection extraImages={props.extraImages || []} />
      </div>
    </div>
  );
}

/*
예시코드

'use client';

import ItemDetail from '@/components/ItemDetail/ItemDetail';
import { ItemDetailData } from '@/types/item';

export default function ItemDetailTestPage() {
  const dummyData: ItemDetailData = {
    type: 'concert', // 'album' 또는 'goods'로도 변경해보세요
    title: 'The Golden Hour : 오렌지 태양 아래',
    image: '/concert.webp', // public 디렉토리에 미리 넣어주세요
    extraImages: [
      '/sub1.webp',
      '/sub2.webp',
      '/sub3.webp',
      '/sub4.webp',
      '/sub5.webp',
      '/sub6.webp',
    ],
    artist: '아이유',
    date: '2022-09-18',
    location: '서울올림픽주경기장',
    cost: 165000,
    popularity: 5,
    review: '대 이 유',
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-[90%] max-w-[1600px]">
        <ItemDetail {...dummyData} />
      </div>
    </div>
  );
}


*/