'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookLayout from '@/components/book/BookLayout';
import AlbumCard from '@/components/album/AlbumCard';
import ItemForm from '@/components/form/ItemForm';
import { getAlbums, createAlbum } from '@/services/albumService';
import { Album } from '@/types/album';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

export default function AlbumPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);

  const fetchAlbums = async () => {
    try {
      const data = await getAlbums();
      setAlbums(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data: Partial<Album>) => {
    try {
      let imageUrl = '';
      let extraImageUrls: string[] = [];

      if (data.image && data.image instanceof File) {
        const formData = new FormData();
        formData.append('file', data.image);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const upload = await res.json();
        imageUrl = upload.url;
      }

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

      const saved = await createAlbum({
        name: data.name!,
        artist: data.artist,
        releaseDate: data.releaseDate,
        image: imageUrl,
        extraImages: extraImageUrls,
        cost: data.cost,
        review: data.review,
      });

      setAlbums((prev) => [...prev, saved.data]);
      alert('앨범이 등록되었습니다!');
      handleClose();
    } catch (e) {
      console.error(e);
      alert('저장 실패');
    }
  };

  return (
    <>
      <BookLayout
        title="앨범북"
        type="album"
        onCreate={handleOpen}
        leftPage={
          albums[0] ? (
            <AlbumCard
              album={{
                id: albums[0].id, // id 넘기기
                title: albums[0].name,
                artist: albums[0].artist ?? '',
                releaseDate: albums[0].releaseDate ?? '',
                thumbnail: albums[0].image
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}${albums[0].image}`
                  : '',
              }}
              onClick={() => router.push(`/album/${albums[0].id}`)}
            />
          ) : (
            <div className="text-gray-400">왼쪽 페이지에 앨범이 없습니다.</div>
          )
        }
        rightPage={
          albums[1] ? (
            <AlbumCard
              album={{
                id: albums[1].id, // id 넘기기
                title: albums[1].name,
                artist: albums[1].artist ?? '',
                releaseDate: albums[1].releaseDate ?? '',
                thumbnail: albums[1].image
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}${albums[1].image}`
                  : '',
              }}
              onClick={() => router.push(`/album/${albums[1].id}`)}
            />
          ) : (
            <div className="text-gray-400">오른쪽 페이지에 앨범이 없습니다.</div>
          )
        }
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>앨범 추가</DialogTitle>
        <DialogContent>
          <ItemForm type="album" onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}
