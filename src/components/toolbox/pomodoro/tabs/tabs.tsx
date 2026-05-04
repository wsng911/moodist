import { cn } from '@/helpers/styles';

import styles from './tabs.module.css';

interface TabsProps {
  onSelect: (id: string) => void;
  selectedTab: string;
  tabs: Array<{ id: string; label: string }>;
}

export function Tabs({ onSelect, selectedTab, tabs }: TabsProps) {
  return (
    <div class名称={styles.tabs}>
      {tabs.map(tab => (
        <button
          class名称={cn(styles.tab, selectedTab === tab.id && styles.selected)}
          key={tab.id}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
