import { Modal } from '@/components/modal';
import { Form } from './form';
import { Todos } from './todos';

import styles from './todo.module.css';

interface TodoProps {
  on关闭: () => void;
  show: boolean;
}

export function Todo({ on关闭, show }: TodoProps) {
  return (
    <Modal show={show} on关闭={on关闭}>
      <header class名称={styles.header}>
        <h2 class名称={styles.title}>Todo Checklist</h2>
        <p class名称={styles.desc}>Super simple todo list.</p>
      </header>

      <Form />
      <Todos />
    </Modal>
  );
}
