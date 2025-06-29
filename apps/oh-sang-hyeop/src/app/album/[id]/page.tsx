'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Album } from '@/types/album';
import { getAlbums } from '@/services/albumService';
import ItemDetail from '@/components/ItemDetail/ItemDetail';

export default function AlbumDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const data = await getAlbums();
        const found = data.find((a) => a.id === id);
        if (found) {
          setAlbum(found);
        } else {
          alert('앨범을 찾을 수 없습니다.');
          router.push('/album');
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchAlbum();
  }, [id, router]);

  // ESC 키로 나가기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/album');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  if (!album) return <div>로딩중...</div>;

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-100">
      <div className="w-[90%] max-w-[1600px]">
        <ItemDetail
          type="album"
          title={album.name}
          image={`${process.env.NEXT_PUBLIC_BASE_URL}${album.image}`}
          extraImages={
            album.extraImages
              ? album.extraImages.filter(
                  (img): img is string => typeof img === 'string'
                )
              : []
          }
          artist={album.artist ?? ''}
          date={album.releaseDate ?? ''}
          cost={album.cost ?? 0}
          review={album.review}
          popularity={5} // album.popularity 없으므로 0
        />
      </div>
    </div>
  );
}
