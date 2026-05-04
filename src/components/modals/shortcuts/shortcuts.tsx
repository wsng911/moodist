import { Modal } from '@/components/modal';

import styles from './shortcuts.module.css';

interface ShortcutsModalProps {
  on关闭: () => void;
  show: boolean;
}

export function ShortcutsModal({ on关闭, show }: ShortcutsModalProps) {
  const shortcuts = [
    {
      keys: ['Shift', 'H'],
      label: 'Shortcuts List',
    },
    {
      keys: ['Shift', 'Alt', 'P'],
      label: '预设',
    },
    {
      keys: ['Shift', 'S'],
      label: 'Share 音效',
    },
    {
      keys: ['Shift', 'Alt', 'T'],
      label: 'Sleep 计时器',
    },
    {
      keys: ['Shift', 'C'],
      label: 'Countdown 计时器',
    },
    {
      keys: ['Shift', 'P'],
      label: 'Pomodoro',
    },
    {
      keys: ['Shift', 'N'],
      label: 'Notepad',
    },
    {
      keys: ['Shift', 'G'],
      label: '设置',
    },
    {
      keys: ['Shift', 'T'],
      label: 'Todo Checklist',
    },
    {
      keys: ['Shift', 'B'],
      label: 'Breathing Exercise',
    },
    {
      keys: ['Shift', 'Space'],
      label: 'Toggle 播放',
    },
    {
      keys: ['Shift', 'R'],
      label: 'Unselect All 音效',
    },
  ];

  return (
    <Modal show={show} on关闭={on关闭}>
      <h1 class名称={styles.heading}>Keyboard Shortcuts</h1>
      <div class名称={styles.shortcuts}>
        {shortcuts.map(shortcut => (
          <Row
            key={shortcut.label}
            keys={shortcut.keys}
            label={shortcut.label}
          />
        ))}
      </div>
    </Modal>
  );
}

interface RowProps {
  keys: Array<string>;
  label: string;
}

function Row({ keys, label }: RowProps) {
  return (
    <div class名称={styles.row}>
      <p class名称={styles.label}>{label}</p>
      <div class名称={styles.divider} />
      <div class名称={styles.keys}>
        {keys.map(key => (
          <Key key={`${label}-${key}`}>{key}</Key>
        ))}
      </div>
    </div>
  );
}

interface KeyProps {
  children: React.ReactNode;
}

function Key({ children }: KeyProps) {
  return <div class名称={styles.key}>{children}</div>;
}
