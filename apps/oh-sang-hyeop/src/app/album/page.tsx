'use client';

import { useRouter } from 'next/navigation';
import BookLayout from '@/components/book/BookLayout';
import AlbumCard from '@/components/album/AlbumCard';

interface Album {
  title: string;
  artist: string;
  releaseDate: string;
  thumbnail: string;
}

export default function AlbumPage() {
  const router = useRouter();

  // 목업 데이터
  const albums: Album[] = [
    {
      title: '아이유 꽃갈피 셋',
      artist: '아이유',
      releaseDate: '2024-09-01',
      thumbnail: '/images/iu_album.webp',
    },
    {
      title: 'THE BOOK 1',
      artist: 'YOASOBI',
      releaseDate: '2024-11-20',
      thumbnail: '/images/yoasobi_album.jpg',
    },
  ];

  return (
    <BookLayout
      title="앨범북"
      type="album"
      onCreate={() => router.push('/album/new')}
      leftPage={
        <AlbumCard
          album={albums[0]!}
        />
      }
      rightPage={
        <AlbumCard
          album={albums[1]!}
         />
      }
      
    />
  );
}