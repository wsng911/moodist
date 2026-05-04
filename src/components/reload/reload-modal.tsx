import { useRegisterSW } from 'virtual:pwa-register/react'; // eslint-disable-line

import { Modal } from '@/components/modal';

import styles from './reload.module.css';

export function ReloadModal() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = () => {
    setNeedRefresh(false);
  };

  return (
    <Modal show={needRefresh} on关闭={close}>
      <h2 class名称={styles.title}>New Content</h2>
      <p class名称={styles.desc}>
        New content available, click on reload button to update.
      </p>

      <div class名称={styles.buttons}>
        <button onClick={close}>关闭</button>

        <button
          class名称={styles.primary}
          onClick={() => updateServiceWorker(true)}
        >
          Reload
        </button>
      </div>
    </Modal>
  );
}
