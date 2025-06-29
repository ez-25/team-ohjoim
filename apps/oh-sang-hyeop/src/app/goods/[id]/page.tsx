'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Goods } from '@/types/goods';
import { getGoodsById } from '@/services/goodsService'; // 단건 조회 함수
import ItemDetail from '@/components/ItemDetail/ItemDetail';

export default function GoodsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const [goods, setGoods] = useState<Goods | null>(null);

  // 굿즈 데이터 가져오기
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const data = await getGoodsById(id); // 아이디로 굿즈 데이터 가져오기
        setGoods(data);
      } catch (e) {
        console.error(e);
        alert('굿즈를 찾을 수 없습니다.');
        router.push('/goods');
      }
    };
    fetchGoods();
  }, [id, router]);

  // ESC 키로 나가기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/goods');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  if (!goods) return <div>로딩중...</div>;

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-100">
      <div className="w-[90%] max-w-[1600px]">
        <ItemDetail
          type="goods"
          title={goods.name}
          image={`${process.env.NEXT_PUBLIC_BASE_URL}${goods.image}`} // 이미지 URL
          extraImages={
            goods.extraImages
              ? goods.extraImages.filter(
                  (img): img is string => typeof img === 'string' // 문자열로 변환된 이미지 배열
                )
              : []
          }
          artist={goods.artist ?? ''}  // 아티스트 정보
          date={''}  // 굿즈에는 날짜가 없으므로 공백 처리
          cost={goods.cost ?? 0}  // 가격
          review={goods.review ?? ''} // 리뷰
          popularity={5} // 굿즈에는 popularity 정보가 없으므로 임의로 5로 설정
        />
      </div>
    </div>
  );
}
