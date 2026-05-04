import { Modal } from '@/components/modal';
import { Slider } from '@/components/slider';
import { use设置Store } from '@/stores/settings';

import styles from './settings.module.css';

interface 设置ModalProps {
  on关闭: () => void;
  show: boolean;
}

export function 设置Modal({ on关闭, show }: 设置ModalProps) {
  const global音量 = use设置Store(state => state.global音量);
  const alarm音量 = use设置Store(state => state.alarm音量);
  const setGlobal音量 = use设置Store(state => state.setGlobal音量);
  const setAlarm音量 = use设置Store(state => state.setAlarm音量);

  return (
    <Modal show={show} on关闭={on关闭}>
      <header class名称={styles.header}>
        <h2 class名称={styles.title}>设置</h2>
        <p class名称={styles.desc}>Control global and alarm volumes.</p>
      </header>

      <div class名称={styles.group}>
        <p class名称={styles.label}>Global 音量</p>
        <Slider
          max={100}
          min={0}
          value={global音量 * 100}
          onChange={value => setGlobal音量(value / 100)}
        />
      </div>

      <div class名称={styles.group}>
        <p class名称={styles.label}>Alarm 音量</p>
        <Slider
          max={100}
          min={0}
          value={alarm音量 * 100}
          onChange={value => setAlarm音量(value / 100)}
        />
      </div>
    </Modal>
  );
}
