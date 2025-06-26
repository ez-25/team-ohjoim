/*
@file ItemInfoSection.tsx
@description 상세 페이지에서 제목, 비용, 별점, 감상평 등을 표시
*/

'use client';

import { Button, Rating, TextField } from '@mui/material';
import { ItemDetailData } from '@/types/item';

interface Props extends ItemDetailData {
  onEdit?: () => void;
}

export default function ItemInfoSection({
  title,
  type,
  cost,
  popularity,
  review,
  onEdit,
}: Props) {
  const getCostLabel = () => {
    if (type === 'concert') return '티켓 비용';
    if (type === 'album') return '앨범 비용';
    return '굿즈 비용';
  };


  return (
    <div className="flex-1 relative space-y-4 p-2">
      {/* ✏️ MUI 수정 버튼 (오른쪽 상단) */}
      <Button
        variant="outlined"
        size="large"
        onClick={onEdit}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          m: 1,
          textTransform: 'none',
        }}
      >
        수정
      </Button>
  {/* 제목 */}
      <h1 className="text-4xl font-bold">{title}</h1>

      {/* 내용 */}
      <div className="space-y-2 text-2xi">
        <p>
          <strong>{getCostLabel()}:</strong> {cost.toLocaleString()}원
        </p>

        <div className="flex items-center gap-2">
          <strong>별점:</strong>
          <Rating
            name="popularity"
            value={popularity}
            precision={0.5}
            readOnly
            size="medium"
          />
        </div>

        {/* 감상평 */}
        <div>
          <TextField
  fullWidth
  multiline
  minRows={3}
  value={review || ''}
  placeholder="감상평이 없습니다."
  slotProps={{
    input: {
      readOnly: true,
    },
  }}
/>
        </div>
      </div>
    </div>
  );
}
