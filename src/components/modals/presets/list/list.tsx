import { Fa播放, FaRegTrashAlt } from 'react-icons/fa/index';

import styles from './list.module.css';

import { useSoundStore } from '@/stores/sound';
import { usePresetStore } from '@/stores/preset';

interface ListProps {
  close: () => void;
}

export function List({ close }: ListProps) {
  const presets = usePresetStore(state => state.presets);
  const change名称 = usePresetStore(state => state.change名称);
  const deletePreset = usePresetStore(state => state.deletePreset);
  const override = useSoundStore(state => state.override);
  const play = useSoundStore(state => state.play);

  return (
    <div class名称={styles.list}>
      <h3 class名称={styles.title}>
        Your 预设 {presets.length > 0 && `(${presets.length})`}
      </h3>

      {!presets.length && (
        <p class名称={styles.empty}>You don&apos;t have any presets yet.</p>
      )}

      {presets.map(preset => (
        <div class名称={styles.preset} key={preset.id}>
          <input
            placeholder="Untitled"
            type="text"
            value={preset.label}
            onChange={e => change名称(preset.id, e.target.value)}
          />
          <button onClick={() => deletePreset(preset.id)}>
            <FaRegTrashAlt />
          </button>
          <button
            class名称={styles.primary}
            onClick={() => {
              override(preset.sounds);
              play();
              close();
            }}
          >
            <Fa播放 />
          </button>
        </div>
      ))}
    </div>
  );
}
