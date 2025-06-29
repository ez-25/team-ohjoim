'use client';

import { MainLayout } from "@/components/layouts";
import { ReviewTest } from "@/components/review";
import { useRouter } from 'next/navigation';

export default function ReviewPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/');
  };

  return (
    <MainLayout 
      title="복습" 
      containerVariant="tight"
    >
      <ReviewTest onComplete={handleComplete} />
    </MainLayout>
  );
}