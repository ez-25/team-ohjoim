import TicketCard from './TicketCard';
import { Ticket } from '@/types/ticket';

interface TicketListProps {
  tickets: Ticket[];
  onSelect?: (ticket: Ticket) => void;
}

export default function TicketList({ tickets, onSelect }: TicketListProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      {tickets.map((ticket, idx) => (
        <TicketCard
          key={ticket.id}
          id={ticket.id}
          title={ticket.title}
          artist={ticket.artist}
          date={ticket.date}
          location={ticket.location}
          thumbnail={ticket.thumbnail}
          onClick={() => onSelect?.(ticket)}
        />
      ))}
    </div>
  );
}
