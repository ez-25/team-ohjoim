import Image from 'next/image';

interface TicketCardProps {
  title: string;
  artist: string;
  date: string;
  location: string;
  thumbnail: string;
  onClick?: () => void;
}

export default function TicketCard({
  title,
  artist,
  date,
  location,
  thumbnail,
  onClick,
}: TicketCardProps) {
  return (
    <div
      className="flex items-center bg-purple-100 rounded-xl overflow-hidden cursor-pointer shadow-lg h-63 w-full"
      onClick={onClick}
    >
      {/* 왼쪽 이미지 */}
      <div className="relative w-40 aspect-[7/10] m-4 flex-shrink-0">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover rounded-md"
          sizes="1920px"
          quality={100}
        />
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex flex-col justify-center flex-1 p-2">
        <h2 className="text-lg font-bold text-purple-900">{title}</h2>
        <div className="text-sm text-purple-800 mt-1 ">
          <br />
          아티스트: {artist}
          <br />
          날짜: {date}
          <br />
          장소: {location}
        </div>
      </div>
    </div>
  );
}
