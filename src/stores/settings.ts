import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import merge from 'deepmerge';

interface 设置Store {
  alarm音量: number;
  global音量: number;
  setAlarm音量: (volume: number) => void;
  setGlobal音量: (volume: number) => void;
}

export const use设置Store = create<设置Store>()(
  persist(
    set => ({
      alarm音量: 1,
      global音量: 1,

      setAlarm音量(volume: number) {
        set({ alarm音量: volume });
      },

      setGlobal音量(volume: number) {
        set({ global音量: volume });
      },
    }),
    {
      merge: (persisted, current) =>
        merge(current, persisted as Partial<设置Store>),
      name: 'moodist-settings',
      partialize: state => ({
        alarm音量: state.alarm音量,
        global音量: state.global音量,
      }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
