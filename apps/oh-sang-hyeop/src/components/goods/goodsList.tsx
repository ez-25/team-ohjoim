import GoodsCard from "./goodsCard";
import { GoodsItem } from "@/types/goods";

interface GoodsListProps {
  goods: GoodsItem[];
  onSelect?: (id: string) => void;
}

export default function GoodsList({ goods, onSelect }: GoodsListProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 p-2 h-full place-items-center">
      {goods.map((item) => (
        <GoodsCard key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}
