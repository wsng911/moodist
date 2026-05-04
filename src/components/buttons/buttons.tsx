import { 播放Button } from './play';
import { UnselectButton } from './unselect';

import styles from './buttons.module.css';

export function Buttons() {
  return (
    <div class名称={styles.buttons}>
      <播放Button />
      <UnselectButton />
    </div>
  );
}
