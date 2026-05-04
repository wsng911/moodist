import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import merge from 'deepmerge';
import { v4 as uuid } from 'uuid';

interface PresetStore {
  addPreset: (label: string, sounds: Record<string, number>) => void;
  change名称: (id: string, new名称: string) => void;
  deletePreset: (id: string) => void;
  presets: Array<{
    id: string;
    label: string;
    sounds: Record<string, number>;
  }>;
}

export const usePresetStore = create<PresetStore>()(
  persist(
    (set, get) => ({
      addPreset(label: string, sounds: Record<string, number>) {
        set({ presets: [{ id: uuid(), label, sounds }, ...get().presets] });
      },

      change名称(id: string, new名称: string) {
        const presets = get().presets.map(preset => {
          if (preset.id === id) return { ...preset, label: new名称 };

          return preset;
        });

        set({ presets });
      },

      deletePreset(id: string) {
        set({ presets: get().presets.filter(preset => preset.id !== id) });
      },

      presets: [],
    }),
    {
      merge: (persisted, current) =>
        merge(current, persisted as Partial<PresetStore>),

      migrate,
      name: 'moodist-presets',
      partialize: state => ({ presets: state.presets }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

function migrate(persistedState: unknown, version: number) {
  let persisted = persistedState as Partial<PresetStore>;

  /**
   * In version 0, presets didn't have an ID
   */
  if (version < 1) {
    persisted = {
      ...persisted,
      presets: (persisted.presets || []).map(preset => {
        if (preset.id) return preset;
        return { ...preset, id: uuid() };
      }),
    } as PresetStore;
  }

  return persisted as PresetStore;
}
