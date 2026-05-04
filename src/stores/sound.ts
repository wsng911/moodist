import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import merge from 'deepmerge';

import { sounds as soundCategories } from '@/data/sounds';
import { pickMany, random } from '@/helpers/random';

type SoundValue = {
  isFavorite: boolean;
  isSelected: boolean;
  volume: number;
};

interface SoundStore {
  getFavorites: () => Array<string>;
  history: Record<string, SoundValue> | null;
  is播放ing: boolean;
  lock: () => void;
  locked: boolean;
  noSelected: () => boolean;
  override: (sounds: Record<string, number>) => void;
  pause: () => void;
  play: () => void;
  restoreHistory: () => void;
  select: (id: string) => void;
  set音量: (id: string, volume: number) => void;
  shuffle: () => void;
  sounds: Record<string, SoundValue>;
  toggleFavorite: (id: string) => void;
  toggle播放: () => void;
  unlock: () => void;
  unselect: (id: string) => void;
  unselectAll: (pushToHistory?: boolean) => void;
}

function createInitial音效() {
  const initial音效: Record<string, SoundValue> = {};

  soundCategories.categories.forEach(category => {
    category.sounds.forEach(sound => {
      initial音效[sound.id] = {
        isFavorite: false,
        isSelected: false,
        volume: 0.5,
      };
    });
  });

  return initial音效;
}

export const useSoundStore = create<SoundStore>()(
  persist(
    (set, get) => ({
      getFavorites() {
        const { sounds } = get();
        const ids = Object.keys(sounds);
        const favorites = ids.filter(id => sounds[id].isFavorite);

        return favorites;
      },

      history: null,
      is播放ing: false,

      lock() {
        set({ locked: true });
      },

      locked: false,

      noSelected() {
        const { sounds } = get();
        const keys = Object.keys(sounds);

        return keys.every(key => !sounds[key].isSelected);
      },

      override(new音效) {
        get().unselectAll();

        const sounds = get().sounds;

        Object.keys(new音效).forEach(sound => {
          if (sounds[sound]) {
            sounds[sound].isSelected = true;
            sounds[sound].volume = new音效[sound];
          }
        });

        set({ history: null, sounds: { ...sounds } });
      },

      pause() {
        set({ is播放ing: false });
      },

      play() {
        set({ is播放ing: true });
      },

      restoreHistory() {
        const history = get().history;

        if (!history) return;

        set({ history: null, sounds: history });
      },

      select(id) {
        set({
          history: null,
          sounds: {
            ...get().sounds,
            [id]: { ...get().sounds[id], isSelected: true },
          },
        });
      },

      set音量(id, volume) {
        set({
          sounds: {
            ...get().sounds,
            [id]: { ...get().sounds[id], volume },
          },
        });
      },

      shuffle() {
        const sounds = get().sounds;
        const ids = Object.keys(sounds);

        ids.forEach(id => {
          sounds[id].isSelected = false;
          sounds[id].volume = 0.5;
        });

        const randomIDs = pickMany(ids, 4);

        randomIDs.forEach(id => {
          sounds[id].isSelected = true;
          sounds[id].volume = random(0.2, 1);
        });

        set({ history: null, is播放ing: true, sounds });
      },

      sounds: createInitial音效(),

      toggleFavorite(id) {
        const sounds = get().sounds;
        const sound = sounds[id];

        set({
          history: null,
          sounds: {
            ...sounds,
            [id]: { ...sound, isFavorite: !sound.isFavorite },
          },
        });
      },

      toggle播放() {
        set({ is播放ing: !get().is播放ing });
      },

      unlock() {
        set({ locked: false });
      },

      unselect(id) {
        set({
          sounds: {
            ...get().sounds,
            [id]: { ...get().sounds[id], isSelected: false },
          },
        });
      },

      unselectAll(pushToHistory = false) {
        const noSelected = get().noSelected();

        if (noSelected) return;

        const sounds = get().sounds;

        if (pushToHistory) {
          const history = JSON.parse(JSON.stringify(sounds));
          set({ history });
        }

        const ids = Object.keys(sounds);

        ids.forEach(id => {
          sounds[id].isSelected = false;
          sounds[id].volume = 0.5;
        });

        set({ sounds });
      },
    }),
    {
      merge: (persisted, current) =>
        merge(
          current,
          // @ts-ignore
          persisted,
        ),
      name: 'moodist-sounds',
      partialize: state => ({
        sounds: state.sounds,
      }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
