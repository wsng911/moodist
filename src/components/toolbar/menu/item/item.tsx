import { FiExternalLink } from 'react-icons/fi/index';
import { Item as DropdownItem } from '@radix-ui/react-dropdown-menu';

import styles from './item.module.css';

interface ItemProps {
  active?: boolean;
  disabled?: boolean;
  href?: string;
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
  shortcut?: string;
}

export function Item({
  active,
  disabled = false,
  href,
  icon,
  label,
  onClick = () => {},
  shortcut,
}: ItemProps) {
  const Comp = href ? 'a' : 'button';

  return (
    <DropdownItem asChild onClick={onClick}>
      <Comp
        class名称={styles.item}
        disabled={disabled}
        {...(href ? { href, target: '_blank' } : {})}
        aria-label={label}
      >
        <span class名称={styles.label}>
          <span class名称={styles.icon}>{icon}</span> {label}
          {active && <div class名称={styles.active} />}
        </span>

        {shortcut && <span class名称={styles.shortcut}>{shortcut}</span>}

        {href && (
          <span class名称={styles.external}>
            <FiExternalLink />
          </span>
        )}
      </Comp>
    </DropdownItem>
  );
}
