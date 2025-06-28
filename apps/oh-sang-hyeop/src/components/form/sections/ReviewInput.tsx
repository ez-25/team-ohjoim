/*
* @file ReviewInput.tsx
* @description 한줄평 입력 섹션 컴포넌트
*/

'use client';

import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { FormValues } from '@/types/itemForm';

interface ReviewInputProps {
  control: Control<FormValues>;
}

const ReviewInput: React.FC<ReviewInputProps> = ({ control }) => {
  return (
    <Box className="flex flex-col gap-2">
      <Typography fontWeight="bold">한줄평</Typography>

      <Controller
        name="review"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="한줄평을 입력하세요"
            multiline
            rows={3}
          />
        )}
      />
    </Box>
  );
};

export default ReviewInput;
