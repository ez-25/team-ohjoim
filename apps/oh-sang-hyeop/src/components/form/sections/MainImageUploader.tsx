/*
* @file MainImageUploader.tsx
* @description 메인 이미지 업로더 컴포넌트
*/

'use client';

import React, { useRef, useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Box, Button, Avatar, Typography } from '@mui/material';
import { FormValues } from '@/types/itemForm';

interface ImageUploaderProps {
  name: keyof FormValues;
  control: Control<FormValues>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ name, control }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Box className="flex flex-col gap-2 items-start">
          <Typography fontWeight="bold">이미지 업로드</Typography>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              onChange(file);
              handleFileChange(file);
            }}
          />

          <Button
            variant="outlined"
            onClick={() => inputRef.current?.click()}
          >
            이미지 선택
          </Button>

          {preview && (
            <Avatar
              src={preview}
              alt="preview"
              variant="rounded"
              sx={{ width: 120, height: 120 }}
            />
          )}
        </Box>
      )}
    />
  );
};

export default ImageUploader;
