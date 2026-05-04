import { sounds } from '@/data/sounds';
import { useMemo } from 'react';
import styles from './category-icons.module.css';
import { Container } from '@/components/container';
import { Tooltip } from '@/components/tooltip';

export default function CategoryIcons() {
  const categories = useMemo(() => sounds.categories, []);

  const goto = (id: string) => {
    const category = document.getElementById(`category-${id}`);
    category?.scrollIntoView();
  };

  return (
    <Container>
      <div class名称={styles.wrapper}>
        <h3 class名称={styles.title}>Categories</h3>
        <div class名称={styles.categoryIconsWrapper}>
          <Tooltip.Provider delayDuration={0}>
            {categories.map(category => {
              return (
                <Tooltip
                  content={category.title}
                  key={category.id}
                  placement="bottom"
                >
                  <button
                    class名称={styles.icon}
                    onClick={() => goto(category.id)}
                  >
                    {category.icon}
                  </button>
                </Tooltip>
              );
            })}
          </Tooltip.Provider>
        </div>
      </div>
    </Container>
  );
}
