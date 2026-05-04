import { MdOutlineAv计时器 } from 'react-icons/md/index';

import { Item } from '../item';

import { usePomodoroStore } from '@/stores/pomodoro';

interface PomodoroProps {
  open: () => void;
}

export function Pomodoro({ open }: PomodoroProps) {
  const running = usePomodoroStore(state => state.running);

  return (
    <Item
      active={running}
      icon={<MdOutlineAv计时器 />}
      label="Pomodoro"
      shortcut="Shift + P"
      onClick={open}
    />
  );
}
