'use client';

import { useState, useEffect } from 'react';
import BookLayout from '@/components/book/BookLayout';
import TicketList from '@/components/ticket/TicketList';
import ItemForm from '@/components/form/ItemForm';
import { Ticket } from '@/types/ticket';
import { createItem, getItems } from '@/services/itemService';
import { FormValues } from '@/types/itemForm';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useRouter } from 'next/navigation';

// JSON Server item 타입
interface JsonTicket extends FormValues {
  id: string;
}

export default function TicketPage() {
  const [open, setOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // 초기 로드
useEffect(() => {
  const fetchTickets = async () => {
    try {
      const data: JsonTicket[] = await getItems();   // 타입 명시
      console.log('data from json-server:', data);

      const mapped: Ticket[] = data.map((item) => ({
      id: item.id,                           // ✅ 추가
      title: item.name,
      artist: item.artist ?? '',
      date: item.date ?? '',
      location: item.location ?? '',
      thumbnail: item.image
        ? `${process.env.NEXT_PUBLIC_BASE_URL}${item.image}`
        : '',
    }));

      setTickets(mapped);
    } catch (err) {
      console.error(err);
    }
  };
  fetchTickets();
}, []);



  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data: FormValues) => {
    try {
      let imageUrl = '';
      const extraImageUrls: string[] = [];

      // 메인 이미지
      if (data.image && data.image instanceof File) {
        const formData = new FormData();
        formData.append('file', data.image);

        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!res.ok) throw new Error('메인 이미지 업로드 실패');
        const upload = await res.json();
        imageUrl = upload.url;
      }

      // 추가 이미지
      if (data.extraImages && data.extraImages.length > 0) {
        for (const file of data.extraImages) {
          const formData = new FormData();
          formData.append('file', file);

          const res = await fetch('/api/upload', { method: 'POST', body: formData });
          if (!res.ok) throw new Error('추가 이미지 업로드 실패');
          const upload = await res.json();
          extraImageUrls.push(upload.url);
        }
      }

      const saved = await createItem({
        ...data,
        image: imageUrl,
        extraImages: extraImageUrls,
      });

      // TicketCard에 맞게 추가
      const newTicket: Ticket = {
        id: saved.data.id, // id 추가
        title: saved.data.name,
        artist: saved.data.artist ?? '',
        date: saved.data.date ?? '',
        location: saved.data.location ?? '',
        thumbnail: saved.data.image
          ? `${process.env.NEXT_PUBLIC_BASE_URL}${saved.data.image}`
          : '',
      };

      setTickets((prev) => [...prev, newTicket]);

      alert('저장 완료!');
      handleClose();
    } catch (error) {
      console.error(error);
      alert('저장 실패 😢');
    }
  };


  const leftTickets = tickets.slice(0, 2);
  const rightTickets = tickets.slice(2, 4);

  return (
    <>
      <BookLayout
        title="티켓북"
        type="concert"
        onCreate={handleOpen}
        leftPage={
          <TicketList
            tickets={leftTickets}
            onSelect={(ticket) => router.push(`/ticket/${ticket.id}`)}
          />
        }
        rightPage={
          <TicketList
            tickets={rightTickets}
            onSelect={(ticket) => console.log('선택된 티켓:', ticket)}
          />
        }
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>티켓 추가</DialogTitle>
        <DialogContent>
          <ItemForm type="concert" onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}
