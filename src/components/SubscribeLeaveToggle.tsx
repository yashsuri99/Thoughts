'use client';
import { FC, startTransition } from 'react';
import { Button } from './ui/Button';
import { useMutation } from '@tanstack/react-query';
import { SubscribeToSubthoughtPayload } from '@/lib/validators/subthoughts';
import axios, { AxiosError } from 'axios';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface SubscribeLeaveToggleProps {
  subthoughtId: string;
  subthoughtName: string;
  isSubscribed: boolean;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  subthoughtId,
  subthoughtName,
  isSubscribed,
}) => {
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubthoughtPayload = {
        subthoughtId,
      };

      const { data } = await axios.post('/api/subthought/subscribe', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: 'There was a problem',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: 'Subscribed',
        description: `You are now subscribed to r/${subthoughtName}`,
      });
    },
  });
  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubthoughtPayload = {
        subthoughtId,
      };

      const { data } = await axios.post('/api/subthought/unsubscribe', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: 'There was a problem',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: 'Unsubscribed',
        description: `You are now Unsubscribed to r/${subthoughtName}`,
      });
    },
  });

  return isSubscribed ? (
    <Button className={'w-full mt-1 mb-4'} onClick={() => unsubscribe()} isLoading={isUnsubLoading}>Leave Community</Button>
  ) : (
    <Button
      className={'w-full mt-1 mb-4'}
      onClick={() => subscribe()}
      isLoading={isSubLoading}
    >
      Join to a post
    </Button>
  );
};

export default SubscribeLeaveToggle;
