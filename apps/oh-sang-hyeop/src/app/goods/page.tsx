'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookLayout from '@/components/book/BookLayout';
import GoodsList from '@/components/goods/goodsList';
import ItemForm from '@/components/form/ItemForm';
import { Goods } from '@/types/goods';
import { getGoods, createGoods } from '@/services/goodsService';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

export default function GoodsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [goodsList, setGoodsList] = useState<Goods[]>([]);

  // 초기 로드
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const data = await getGoods();
        console.log('data from json-server:', data);

        setGoodsList(Array.isArray(data) ? data : []); // 방어코드
      } catch (err) {
        console.error(err);
        setGoodsList([]); // fallback
      }
    };
    fetchGoods();
  }, []);

  // 모달
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data: Partial<Goods>) => {
    try {
      let imageUrl = '';
      let extraImageUrls: string[] = [];

      // 메인 이미지 업로드
      if (data.image && data.image instanceof File) {
        const formData = new FormData();
        formData.append('file', data.image);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const upload = await res.json();
        imageUrl = upload.url;
      }

      // 추가 이미지 업로드
      if (data.extraImages && data.extraImages.length > 0) {
        for (const file of data.extraImages) {
          if (file instanceof File) {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const upload = await res.json();
            extraImageUrls.push(upload.url);
          } else if (typeof file === 'string') {
            extraImageUrls.push(file);
          }
        }
      }

      const saved = await createGoods({
        name: data.name!,
        artist: data.artist,
        image: imageUrl,
        extraImages: extraImageUrls,
        cost: data.cost,
        review: data.review,
      });

      // GoodsList 용으로 변환
      const newGoodsItem: Goods = {
        id: saved.data.id,
        name: saved.data.name,
        artist: saved.data.artist,
        image: saved.data.image,
        extraImages: saved.data.extraImages,
        cost: saved.data.cost,
        review: saved.data.review,
      };

      setGoodsList((prev) => [...prev, newGoodsItem]);
      alert('굿즈 등록 완료!');
      handleClose();
    } catch (e) {
      console.error(e);
      alert('등록 실패');
    }
  };

  return (
    <>
      <BookLayout
        title="굿즈북"
        type="goods"
        onCreate={handleOpen}
        leftPage={
          goodsList.length > 0 ? (
            <GoodsList
              goods={goodsList.slice(0, 4).map((g) => ({
                id: g.id,
                name: g.name,
                imageUrl: g.image ? `${process.env.NEXT_PUBLIC_BASE_URL}${g.image}` : '',
              }))}
              onSelect={(id) => router.push(`/goods/${id}`)}
            />
          ) : (
            <div className="flex justify-center items-center h-full text-gray-400">
              등록된 굿즈가 없습니다.
            </div>
          )
        }
        rightPage={
          goodsList.length > 4 ? (
            <GoodsList
              goods={goodsList.slice(4, 8).map((g) => ({
                id: g.id,
                name: g.name,
                imageUrl: g.image ? `${process.env.NEXT_PUBLIC_BASE_URL}${g.image}` : '',
              }))}
              onSelect={(id) => router.push(`/goods/${id}`)}
            />
          ) : (
            <div className="flex justify-center items-center h-full text-gray-400">
              추가 굿즈가 없습니다.
            </div>
          )
        }
      />

      {/* 모달 */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>굿즈 등록</DialogTitle>
        <DialogContent>
          <ItemForm type="goods" onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}
