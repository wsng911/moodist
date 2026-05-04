import { create } from 'zustand';

interface Sleep计时器Store {
  active: boolean;
  set: (value: boolean) => void;
}

export const useSleep计时器Store = create<Sleep计时器Store>()(set => ({
  active: false,
  set(value: boolean) {
    set({ active: value });
  },
}));
