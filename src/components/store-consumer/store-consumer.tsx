import { useEffect } from 'react';

import { useSoundStore } from '@/stores/sound';
import { use设置Store } from '@/stores/settings';
import { useNoteStore } from '@/stores/note';
import { usePresetStore } from '@/stores/preset';
import { useTodoStore } from '@/stores/todo';

interface StoreConsumerProps {
  children: React.ReactNode;
}

export function StoreConsumer({ children }: StoreConsumerProps) {
  useEffect(() => {
    useSoundStore.persist.rehydrate();
    use设置Store.persist.rehydrate();
    useNoteStore.persist.rehydrate();
    usePresetStore.persist.rehydrate();
    useTodoStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
