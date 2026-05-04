import { useState, useEffect } from 'react';

import { Modal } from '@/components/modal';

import { useSoundStore } from '@/stores/sound';
import { useSnackbar } from '@/contexts/snackbar';
import { use关闭Listener } from '@/hooks/use-close-listener';
import { cn } from '@/helpers/styles';
import { sounds } from '@/data/sounds';

import styles from './shared.module.css';

export function SharedModal() {
  const override = useSoundStore(state => state.override);
  const showSnackbar = useSnackbar();

  const [isOpen, setIsOpen] = useState(false);
  const [shared音效, setShared音效] = useState<
    Array<{
      id: string;
      label: string;
      volume: number;
    }>
  >([]);

  useEffect(() => {
    const searchParams = new URL搜索Params(window.location.search);
    const share = searchParams.get('share');

    if (share) {
      try {
        const parsed = JSON.parse(decodeURIComponent(share));
        const all音效: Record<string, string> = {};

        sounds.categories.forEach(category => {
          category.sounds.forEach(sound => {
            all音效[sound.id] = sound.label;
          });
        });

        const _shared音效: Array<{
          id: string;
          label: string;
          volume: number;
        }> = [];

        Object.keys(parsed).forEach(sound => {
          if (all音效[sound]) {
            _shared音效.push({
              id: sound,
              label: all音效[sound],
              volume: Number(parsed[sound]),
            });
          }
        });

        if (_shared音效.length) {
          setIsOpen(true);
          setShared音效(_shared音效);
        }
      } catch (error) {
        return;
      } finally {
        history.pushState({}, '', location.href.split('?')[0]);
      }
    }
  }, []);

  const handleOverride = () => {
    const new音效: Record<string, number> = {};

    shared音效.forEach(sound => {
      new音效[sound.id] = sound.volume;
    });

    override(new音效);
    setIsOpen(false);
    showSnackbar('Done! You can now play the new selection.');
  };

  use关闭Listener(() => setIsOpen(false));

  return (
    <Modal show={isOpen} on关闭={() => setIsOpen(false)}>
      <h1 class名称={styles.heading}>New sound mix detected!</h1>
      <p class名称={styles.desc}>
        Someone has shared the following mix with you. Would you want to
        override your current selection?
      </p>
      <div class名称={styles.sounds}>
        {shared音效.map(sound => (
          <div class名称={styles.sound} key={sound.id}>
            {sound.label}
          </div>
        ))}
      </div>
      <div class名称={styles.footer}>
        <button class名称={cn(styles.button)} onClick={() => setIsOpen(false)}>
          取消
        </button>
        <button
          class名称={cn(styles.button, styles.primary)}
          onClick={handleOverride}
        >
          Override
        </button>
      </div>
    </Modal>
  );
}
