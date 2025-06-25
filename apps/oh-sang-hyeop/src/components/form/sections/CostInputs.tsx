/*
* @file CostInputs.tsx
* @description 비용 입력 섹션 컴포넌트
*/
'use client';

import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { FormValues, ItemType } from '@/types/itemForm';

interface CostInputsProps {
  control: Control<FormValues>;
  type: ItemType;
}

const costLabelMap: Record<ItemType, string> = {
  concert: '티켓 비용',
  album: '앨범 비용',
  goods: '굿즈 비용',
};

const CostInputs: React.FC<CostInputsProps> = ({ control, type }) => {
  return (
    <Box className="flex flex-col gap-4">
      <Typography fontWeight="bold">비용 정보</Typography>

      <Controller
        name="cost"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type="number"
            label={costLabelMap[type]}
            slotProps={{ input: { inputProps: { min: 0 } } }}
          />
        )}
      />
    </Box>
  );
};

export default CostInputs;
