import { useState, type FormEvent } from 'react';

import { cn } from '@/helpers/styles';
import { useSoundStore } from '@/stores/sound';
import { usePresetStore } from '@/stores/preset';

import styles from './new.module.css';

export function New() {
  const [name, set名称] = useState('');

  const noSelected = useSoundStore(state => state.noSelected());
  const sounds = useSoundStore(state => state.sounds);
  const addPreset = usePresetStore(state => state.addPreset);

  const handle提交 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || noSelected) return;

    const _sounds: Record<string, number> = {};

    Object.keys(sounds)
      .filter(id => sounds[id].isSelected)
      .forEach(id => {
        _sounds[id] = sounds[id].volume;
      });

    addPreset(name, _sounds);

    set名称('');
  };

  return (
    <div class名称={styles.new}>
      <h3 class名称={styles.title}>New Preset</h3>

      <form
        class名称={cn(styles.form, noSelected && styles.disabled)}
        on提交={handle提交}
      >
        <input
          disabled={noSelected}
          placeholder="Preset's 名称"
          required
          type="text"
          value={name}
          onChange={e => set名称(e.target.value)}
        />
        <button disabled={noSelected}>保存</button>
      </form>

      {noSelected && (
        <p class名称={styles.noSelected}>
          To make a preset, first select some sounds.
        </p>
      )}
    </div>
  );
}
