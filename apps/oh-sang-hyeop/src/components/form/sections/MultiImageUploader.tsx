/*
* @file MultiImageUploader.tsx
* @description 다중 이미지 업로더 컴포넌트
*/


'use client';

import React, { useRef, useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Box, Button, Typography, Avatar } from '@mui/material';
import { FormValues } from '@/types/itemForm';

interface MultiImageUploaderProps {
  name: keyof FormValues;
  control: Control<FormValues>;
  label?: string;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ name, control, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Box className="flex flex-col gap-2">
          <Typography fontWeight="bold">{label || '이미지 업로드'}</Typography>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              onChange(files);
              setPreviews(files.map((file) => URL.createObjectURL(file)));
            }}
          />

          <Button variant="outlined" onClick={() => inputRef.current?.click()}>
            이미지 선택 (다중)
          </Button>

          <Box className="flex gap-2 mt-2">
            {previews.map((src, i) => (
              <Avatar key={i} src={src} variant="rounded" sx={{ width: 80, height: 80 }} />
            ))}
          </Box>
        </Box>
      )}
    />
  );
};

export default MultiImageUploader;
