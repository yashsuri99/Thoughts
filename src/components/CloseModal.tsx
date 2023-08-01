'use client';

import { Button } from '@/components/ui/Button';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CloseModal = ({}) => {
  const router = useRouter();

  return (
    <Button
      variant={'subtle'}
      aria-label="Close Modal"
      onClick={() => router.back()}
      className={'h-6 w-6 p-0 rounded-md'}
    >
      <X className={'h-4 w-4'} />
    </Button>
  );
};

export default CloseModal;
