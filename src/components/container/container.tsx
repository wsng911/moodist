import { cn } from '@/helpers/styles';

import styles from './container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  class名称?: string;
  tight?: boolean;
  wide?: boolean;
}

export function Container({
  children,
  class名称,
  tight,
  wide,
}: ContainerProps) {
  return (
    <div
      class名称={cn(
        styles.container,
        class名称,
        tight && styles.tight,
        wide && styles.wide,
      )}
    >
      {children}
    </div>
  );
}
