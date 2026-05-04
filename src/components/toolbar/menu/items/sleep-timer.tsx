import { IoMoonSharp } from 'react-icons/io5/index';

import { useSleep计时器Store } from '@/stores/sleep-timer';
import { Item } from '../item';

interface Sleep计时器Props {
  open: () => void;
}

export function Sleep计时器({ open }: Sleep计时器Props) {
  const active = useSleep计时器Store(state => state.active);

  return (
    <Item
      active={active}
      icon={<IoMoonSharp />}
      label="Sleep 计时器"
      shortcut="Shift + Alt + T"
      onClick={open}
    />
  );
}
