'use client';

import GoodsList from "@/components/goods/goodsList";
import BookLayout from "@/components/book/BookLayout"; // 이미 구현돼 있다고 가정
import { useState } from "react";
import { GoodsItem } from "@/types/goods";

export default function GoodsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const goods: GoodsItem[] = [
    { id: 'g1', name: '응원봉', imageUrl: '/goods/lightstick.jpg' },
    { id: 'g2', name: '포토카드', imageUrl: '/goods/photocard.jpg' },
    { id: 'g3', name: '키링', imageUrl: '/goods/keyring.webp' },
    { id: 'g4', name: '티셔츠',imageUrl: '/goods/tshirt.jpg' },
    { id: 'g5', name: '후드집업', imageUrl: '/goods/hoodie.webp' },
    { id: 'g6', name: '에코백', imageUrl: '/goods/ecobag.webp' },
    { id: 'g7', name: '캡모자', imageUrl: '/goods/cap.webp' },
    { id: 'g8', name: '팔찌', imageUrl: '/goods/bracelet.webp' },
  ];

  return (
    <BookLayout
      title="굿즈 목록"
      type="goods"
      onCreate={() => { /* TODO: implement create handler */ }}
      leftPage={
        <GoodsList
          goods={goods.slice(0, 4)}
          onSelect={(id) => setSelectedId(id)}
        />
      }
      rightPage={
        <GoodsList
          goods={goods.slice(4, 8)}
          onSelect={(id) => setSelectedId(id)}
        />
      }
    />
  );
}
