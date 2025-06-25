/*
//예시코드 

'use client';

import React from 'react';
import ItemForm from '@/components/form/ItemForm';
import { FormValues } from '@/types/itemForm';

const ConcertFormPreviewPage: React.FC = () => {
  const handleSubmit = (data: FormValues) => {
    console.log('콘서트 입력 데이터:', data);
    alert('콘솔에서 데이터를 확인하세요!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <ItemForm type="concert" onSubmit={handleSubmit} />
    </div>
  );
};

export default ConcertFormPreviewPage;

*/

'use client';

import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { ItemType, FormValues } from '@/types/itemForm';

import MainImageUploader from './sections/MainImageUploader';
import MultiImageUploader from './sections/MultiImageUploader';
import ArtistInfoSection from './sections/ArtistInfoSection';
import CostInputs from './sections/CostInputs';
import ReviewInput from './sections/ReviewInput';
import LocationInput from './sections/LocationInput';

interface ItemFormProps {
  type: ItemType;
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;

  showImage?: boolean;
  showLocation?: boolean;
  showCost?: boolean;
  showReview?: boolean;
}

const typeLabels: Record<ItemType, string> = {
  concert: '콘서트',
  album: '앨범',
  goods: '굿즈',
};

const ItemForm: React.FC<ItemFormProps> = ({
  type,
  onSubmit,
  defaultValues = {},
  showImage = true,
  showLocation = type === 'concert',
  showCost = true,
  showReview = true,
}) => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues,
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 max-w-2xl mx-auto p-6"
    >
      <Typography variant="h5" fontWeight="bold" className="mb-2">
        {typeLabels[type]} 정보 입력
      </Typography>

      {showImage && (
        <>
          <MainImageUploader name="image" control={control} />
          <MultiImageUploader name="extraImages" control={control} label="추가 이미지 업로드" />
        </>
      )}

      {/* 이름 입력 필드 - useForm Controller 방식 적용 */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField {...field} fullWidth label={`${typeLabels[type]} 이름`} />
        )}
      />

      <ArtistInfoSection control={control} />

      {showLocation && <LocationInput control={control} />}

      {showCost && <CostInputs type={type} control={control} />}

      {showReview && <ReviewInput control={control} />}

      <Button type="submit" variant="contained" className="self-end">
        저장하기
      </Button>
    </Box>
  );
};

export default ItemForm;
