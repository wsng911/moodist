import { cn } from '@/helpers/styles';

import styles from './special-button.module.css';

interface SpecialButtonProps {
  children: React.ReactNode;
  class名称?: string;
  href: string;
  internal?: boolean;
}

export function SpecialButton({
  children,
  class名称,
  href,
  internal,
}: SpecialButtonProps) {
  return (
    <a
      class名称={cn(styles.button, class名称)}
      href={href}
      {...(!internal ? { rel: 'noreferrer', target: '_blank' } : {})}
    >
      {children}
    </a>
  );
}
