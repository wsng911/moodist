import { useSoundStore } from '@/stores/sound';

import styles from './range.module.css';

interface RangeProps {
  id: string;
  label: string;
}

export function Range({ id, label }: RangeProps) {
  const set音量 = useSoundStore(state => state.set音量);
  const volume = useSoundStore(state => state.sounds[id].volume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);
  const locked = useSoundStore(state => state.locked);

  return (
    <input
      aria-label={`${label} sound volume`}
      autoComplete="off"
      class名称={styles.range}
      disabled={!isSelected}
      max={100}
      min={0}
      type="range"
      value={volume * 100}
      onClick={e => e.stopPropagation()}
      onChange={e =>
        !locked && isSelected && set音量(id, Number(e.target.value) / 100)
      }
    />
  );
}
