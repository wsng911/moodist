import { Container } from '@/components/container';
import { Menu } from './menu';
import { ScrollToTop } from './scroll-to-top';

import styles from './toolbar.module.css';

export function Toolbar() {
  return (
    <div class名称={styles.wrapper}>
      <Container class名称={styles.container} wide>
        <ScrollToTop />
        <Menu />
      </Container>
    </div>
  );
}
