'use client';

import { useRouter } from 'next/navigation';
import BookLayout from '@/components/book/BookLayout';
import TicketList from '@/components/ticket/TicketList';

interface Ticket {
  title: string;
  artist: string;
  date: string;
  location: string;
  thumbnail: string;
}


export default function TicketPage() {
  const router = useRouter();

  // 예시 티켓 4개
 const tickets: Ticket[] = [
  {
    title: '아이유 콘서트',
    artist: '아이유',
    date: '2024-11-01',
    location: 'KSPO DOME',
    thumbnail: '/images/ex1.jpg',
  },
  {
    title: '아이묭 콘서트',
    artist: '아이묭',
    date: '2024-10-15',
    location: '도쿄돔',
    thumbnail: '/images/ex2.webp',
  },
  {
    title: '에스파 콘서트',
    artist: '에스파',
    date: '2024-12-05',
    location: '고척스카이돔',
    thumbnail: '/images/ex3.webp',
  },
  {
    title: '요아소비 콘서트',
    artist: '요아소비',
    date: '2025-01-20',
    location: '인스파이어 아레나',
    thumbnail: '/images/ex4.jpg',
  },
];


  // 좌측 2개, 우측 2개
  const leftTickets = tickets.slice(0, 2);
  const rightTickets = tickets.slice(2, 4);

  return (
    <BookLayout
      title="티켓북"
      type="concert"
      onCreate={() => router.push('/ticket/new')}
      leftPage={
        <TicketList
          tickets={leftTickets}
          onSelect={(ticket) => console.log('선택된 티켓:', ticket)}
        />
      }
      rightPage={
        <TicketList
          tickets={rightTickets}
          onSelect={(ticket) => console.log('선택된 티켓:', ticket)}
        />
      }
    />
  );
}
