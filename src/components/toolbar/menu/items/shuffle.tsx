import { BiShuffle } from 'react-icons/bi/index';

import { useSoundStore } from '@/stores/sound';

import { Item } from '../item';

export function Shuffle() {
  const shuffle = useSoundStore(state => state.shuffle);
  const locked = useSoundStore(state => state.locked);

  return (
    <Item
      disabled={locked}
      icon={<BiShuffle />}
      label="Shuffle 音效"
      onClick={shuffle}
    />
  );
}
