import { 音效 } from '@/components/sounds';

import styles from './category.module.css';

import type { Category } from '@/data/types';

interface CategoryProps extends Category {
  functional?: boolean;
}

export function Category({
  functional = true,
  icon,
  id,
  sounds,
  title,
}: CategoryProps) {
  return (
    <div class名称={styles.category} id={`category-${id}`}>
      <div class名称={styles.iconContainer}>
        <div class名称={styles.tail} />
        <div aria-hidden="true" class名称={styles.icon}>
          {icon}
        </div>
      </div>

      <div class名称={styles.title}>{title}</div>

      <音效 functional={functional} id={id} sounds={sounds} />
    </div>
  );
}
