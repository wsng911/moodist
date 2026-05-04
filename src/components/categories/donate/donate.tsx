import { FaCoffee } from 'react-icons/fa/index';

import { SpecialButton } from '@/components/special-button';

import styles from './donate.module.css';

export function Donate() {
  return (
    <div class名称={styles.donate}>
      <div class名称={styles.iconContainer}>
        <div class名称={styles.tail} />
        <div aria-hidden="true" class名称={styles.icon}>
          <FaCoffee />
        </div>
      </div>

      <div class名称={styles.title}>
        <span>Support Me</span>
      </div>
      <p class名称={styles.desc}>Help me keep Moodist ad-free.</p>
      <SpecialButton
        class名称={styles.button}
        href="https://buymeacoffee.com/remvze"
      >
        Donate Today
      </SpecialButton>
    </div>
  );
}
