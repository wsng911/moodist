import { useCallback, useEffect } from 'react';
import { Bi暂停, Bi播放 } from 'react-icons/bi/index';
import { useHotkeys } from 'react-hotkeys-hook';

import { useSoundStore } from '@/stores/sound';
import { useSnackbar } from '@/contexts/snackbar';
import { cn } from '@/helpers/styles';

import styles from './play.module.css';

export function 播放Button() {
  const is播放ing = useSoundStore(state => state.is播放ing);
  const pause = useSoundStore(state => state.pause);
  const toggle = useSoundStore(state => state.toggle播放);
  const noSelected = useSoundStore(state => state.noSelected());
  const locked = useSoundStore(state => state.locked);

  const showSnackbar = useSnackbar();

  const handleToggle = useCallback(() => {
    if (locked) return;

    if (noSelected) return showSnackbar('Please first select a sound to play.');

    toggle();
  }, [showSnackbar, toggle, noSelected, locked]);

  useEffect(() => {
    if (is播放ing && noSelected) pause();
  }, [is播放ing, pause, noSelected]);

  useHotkeys('shift+space', handleToggle, {}, [handleToggle]);

  return (
    <button
      aria-disabled={noSelected}
      class名称={cn(styles.playButton, noSelected && styles.disabled)}
      onClick={handleToggle}
    >
      {is播放ing ? (
        <>
          <span aria-hidden="true">
            <Bi暂停 />
          </span>{' '}
          暂停
        </>
      ) : (
        <>
          <span aria-hidden="true">
            <Bi播放 />
          </span>{' '}
          播放
        </>
      )}
    </button>
  );
}
