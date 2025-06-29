// src/app/ticket/[id]/page.tsx
import { notFound } from 'next/navigation';
import ItemDetail from '@/components/ItemDetail/ItemDetail';
import { getItemById } from '@/services/itemService';

interface TicketDetailPageProps {
  params: {
    id: string;
  };
}

export default async function TicketDetailPage({ params }: TicketDetailPageProps) {
  const { id } = params;

  // JSON Server에서 아이템 하나 조회
  const item = await getItemById(id);

  if (!item) return notFound();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-[90%] max-w-[1600px]">
        <ItemDetail
          type="concert"
          title={item.name}
          image={item.image}
          extraImages={item.extraImages ?? []}
          artist={item.artist}
          date={item.date}
          location={item.location}
          cost={item.cost ? Number(item.cost) : 0}
          popularity={5}
          review={item.review}
        />
      </div>
    </div>
  );
}
