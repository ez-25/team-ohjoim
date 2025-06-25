/*
* @file LocationInput.tsx
* @description 장소 입력 섹션 컴포넌트
*/

'use client';

import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { FormValues } from '@/types/itemForm';

interface LocationInputProps {
  control: Control<FormValues>;
}

const LocationInput: React.FC<LocationInputProps> = ({ control }) => {
  return (
    <Box className="flex flex-col gap-2">
      <Typography fontWeight="bold">장소</Typography>
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <TextField {...field} fullWidth label="콘서트 장소" />
        )}
      />
    </Box>
  );
};

export default LocationInput;
