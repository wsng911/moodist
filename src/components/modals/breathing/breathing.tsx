import { Modal } from '@/components/modal';
import { Exercise } from './exercise';

import styles from './breathing.module.css';

interface 计时器Props {
  on关闭: () => void;
  show: boolean;
}

export function BreathingExerciseModal({ on关闭, show }: 计时器Props) {
  return (
    <Modal show={show} on关闭={on关闭}>
      <h2 class名称={styles.title}>Breathing Exercise</h2>
      <Exercise />
    </Modal>
  );
}
