import { useState, useMemo, useCallback } from 'react';
import { IoMenu, Io关闭 } from 'react-icons/io5/index';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useHotkeys } from 'react-hotkeys-hook';
import { AnimatePresence, motion } from 'motion/react';

import {
  ShuffleItem,
  ShareItem,
  DonateItem,
  SourceItem,
  设置Item,
  预设Item,
  ShortcutsItem,
  Sleep计时器Item,
  BreathingExerciseItem,
  PomodoroItem,
  NotepadItem,
  TodoItem,
  CountdownItem,
  BinauralItem,
  IsochronicItem,
  LofiItem,
} from './items';
import { Divider } from './divider';
import { ShareLinkModal } from '@/components/modals/share-link';
import { 预设Modal } from '@/components/modals/presets';
import { ShortcutsModal } from '@/components/modals/shortcuts';
import { Sleep计时器Modal } from '@/components/modals/sleep-timer';
import { 设置Modal } from '@/components/modals/settings';
import { BreathingExerciseModal } from '@/components/modals/breathing';
import { BinauralModal } from '@/components/modals/binaural';
import { IsochronicModal } from '@/components/modals/isochronic';
import { LofiModal } from '@/components/modals/lofi';
import { Pomodoro, Notepad, Todo, Countdown } from '@/components/toolbox';

import { fade, mix, slideY } from '@/lib/motion';
import { useSoundStore } from '@/stores/sound';

import styles from './menu.module.css';
import { use关闭Listener } from '@/hooks/use-close-listener';
import { closeModals } from '@/lib/modal';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const noSelected = useSoundStore(state => state.noSelected());

  const initial = useMemo(
    () => ({
      binaural: false,
      breathing: false,
      countdown: false,
      isochronic: false,
      lofi: false,
      notepad: false,
      pomodoro: false,
      presets: false,
      settings: false,
      shareLink: false,
      shortcuts: false,
      sleep计时器: false,
      todo: false,
    }),
    [],
  );

  const [modals, setModals] = useState(initial);

  const close = useCallback((name: string) => {
    setModals(prev => ({ ...prev, [name]: false }));
  }, []);

  const closeAll = useCallback(() => setModals(initial), [initial]);

  const open = useCallback(
    (name: string) => {
      closeAll();
      setIsOpen(false);
      closeModals();
      setModals(prev => ({ ...prev, [name]: true }));
    },
    [closeAll],
  );

  useHotkeys('shift+m', () => setIsOpen(prev => !prev));
  useHotkeys('shift+alt+p', () => open('presets'));
  useHotkeys('shift+h', () => open('shortcuts'));
  useHotkeys('shift+b', () => open('breathing'));
  useHotkeys('shift+n', () => open('notepad'));
  useHotkeys('shift+p', () => open('pomodoro'));
  useHotkeys('shift+t', () => open('todo'));
  useHotkeys('shift+c', () => open('countdown'));
  useHotkeys('shift+g', () => open('settings'));
  useHotkeys('shift+s', () => open('shareLink'), { enabled: !noSelected });
  useHotkeys('shift+alt+t', () => open('sleep计时器'));

  use关闭Listener(closeAll);

  const variants = mix(fade(), slideY());

  return (
    <>
      <div class名称={styles.wrapper}>
        <DropdownMenu.Root open={isOpen} onOpenChange={o => setIsOpen(o)}>
          <DropdownMenu.Trigger asChild>
            <button aria-label="Menu" class名称={styles.menuButton}>
              {isOpen ? <Io关闭 /> : <IoMenu />}
            </button>
          </DropdownMenu.Trigger>

          <AnimatePresence>
            {isOpen && (
              <DropdownMenu.Portal forceMount>
                <DropdownMenu.Content
                  align="end"
                  asChild
                  collisionPadding={10}
                  side="top"
                  sideOffset={12}
                >
                  <motion.div
                    animate="show"
                    class名称={styles.menu}
                    exit="hidden"
                    initial="hidden"
                    variants={variants}
                  >
                    <预设Item open={() => open('presets')} />
                    <ShareItem open={() => open('shareLink')} />
                    <ShuffleItem />
                    <Sleep计时器Item open={() => open('sleep计时器')} />

                    <Divider />
                    <CountdownItem open={() => open('countdown')} />
                    <PomodoroItem open={() => open('pomodoro')} />
                    <NotepadItem open={() => open('notepad')} />
                    <TodoItem open={() => open('todo')} />
                    <BreathingExerciseItem open={() => open('breathing')} />

                    <Divider />
                    <BinauralItem open={() => open('binaural')} />
                    <IsochronicItem open={() => open('isochronic')} />
                    <LofiItem open={() => open('lofi')} />

                    <Divider />
                    <设置Item open={() => open('settings')} />
                    <Divider />
                    <ShortcutsItem open={() => open('shortcuts')} />
                    <Divider />
                    <DonateItem />
                    <SourceItem />
                  </motion.div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            )}
          </AnimatePresence>
        </DropdownMenu.Root>
      </div>

      <ShareLinkModal
        show={modals.shareLink}
        on关闭={() => close('shareLink')}
      />
      <BreathingExerciseModal
        show={modals.breathing}
        on关闭={() => close('breathing')}
      />
      <ShortcutsModal
        show={modals.shortcuts}
        on关闭={() => close('shortcuts')}
      />
      <设置Modal show={modals.settings} on关闭={() => close('settings')} />
      <Pomodoro
        open={() => open('pomodoro')}
        show={modals.pomodoro}
        on关闭={() => close('pomodoro')}
      />
      <Notepad show={modals.notepad} on关闭={() => close('notepad')} />
      <Todo show={modals.todo} on关闭={() => close('todo')} />
      <Countdown show={modals.countdown} on关闭={() => close('countdown')} />
      <预设Modal show={modals.presets} on关闭={() => close('presets')} />
      <Sleep计时器Modal
        show={modals.sleep计时器}
        on关闭={() => close('sleep计时器')}
      />
      <BinauralModal show={modals.binaural} on关闭={() => close('binaural')} />
      <IsochronicModal
        show={modals.isochronic}
        on关闭={() => close('isochronic')}
      />
      <LofiModal show={modals.lofi} on关闭={() => close('lofi')} />
    </>
  );
}
