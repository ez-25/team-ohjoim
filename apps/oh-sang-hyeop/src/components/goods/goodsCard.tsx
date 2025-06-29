import Image from "next/image";
import { GoodsItem } from "@/types/goods";

interface GoodsCardProps {
  item: GoodsItem;
  onSelect?: (id: string) => void;
}

export default function GoodsCard({ item, onSelect }: GoodsCardProps) {
  return (
    <div
  className="w-[180px] h-[240px] bg-white rounded-lg p-2 shadow-md hover:shadow-lg cursor-pointer flex flex-col"
  onClick={() => onSelect?.(item.id)}
>
  <div className="relative w-full h-[180px] rounded overflow-hidden">
    <Image
      src={item.imageUrl}
      alt={item.name}
      fill
      className="object-cover"
    />
  </div>
  <div className="text-center text-sm mt-2 p-1 font-semibold text-purple-700">{item.name}</div>
</div>

  );
}
