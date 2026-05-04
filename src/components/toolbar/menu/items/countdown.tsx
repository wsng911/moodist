import { MdOutline计时器 } from 'react-icons/md/index';

import { Item } from '../item';

interface CountdownProps {
  open: () => void;
}

export function Countdown({ open }: CountdownProps) {
  return (
    <Item
      icon={<MdOutline计时器 />}
      label="Countdown 计时器"
      shortcut="Shift + C"
      onClick={open}
    />
  );
}
