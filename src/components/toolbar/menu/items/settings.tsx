import { Io设置Sharp } from 'react-icons/io5/index';

import { Item } from '../item';

interface 设置Props {
  open: () => void;
}

export function 设置({ open }: 设置Props) {
  return (
    <Item
      icon={<Io设置Sharp />}
      label="设置"
      shortcut="Shift + G"
      onClick={open}
    />
  );
}
