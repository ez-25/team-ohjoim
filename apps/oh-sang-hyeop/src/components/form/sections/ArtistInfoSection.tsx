/*
* @file ArtistInfoSection.tsx
* @description 아티스트 정보 입력 섹션 컴포넌트
*/

'use client';
import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { FormValues } from '@/types/itemForm';

interface ArtistInfoSectionProps {
  control: Control<FormValues>;
}

const ArtistInfoSection: React.FC<ArtistInfoSectionProps> = ({ control }) => {
  return (
    <Box className="flex flex-col gap-4">
      <Typography fontWeight="bold">아티스트 정보</Typography>

      {/* 아티스트명 */}
      <Controller
        name="artist"
        control={control}
        render={({ field }) => (
          <TextField {...field} fullWidth label="아티스트명" />
        )}
      />

      {/* 날짜 */}
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="날짜"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        )}
      />
    </Box>
  );
};

export default ArtistInfoSection;
