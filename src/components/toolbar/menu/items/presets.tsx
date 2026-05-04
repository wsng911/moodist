import { Ri播放ListFill } from 'react-icons/ri/index';

import { Item } from '../item';

interface 预设Props {
  open: () => void;
}

export function 预设({ open }: 预设Props) {
  return (
    <Item
      icon={<Ri播放ListFill />}
      label="Your 预设"
      shortcut="Shift + Alt + P"
      onClick={open}
    />
  );
}
