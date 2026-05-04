import { Modal } from '@/components/modal';
import { New } from './new';
import { List } from './list';

import styles from './presets.module.css';

interface 预设ModalProps {
  on关闭: () => void;
  show: boolean;
}

export function 预设Modal({ on关闭, show }: 预设ModalProps) {
  return (
    <Modal show={show} on关闭={on关闭}>
      <h2 class名称={styles.title}>预设</h2>
      <New />
      <div class名称={styles.divider} />
      <List close={on关闭} />
    </Modal>
  );
}
