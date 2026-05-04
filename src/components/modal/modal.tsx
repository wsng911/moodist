import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Io关闭 } from 'react-icons/io5/index';
import 专注Trap from 'focus-trap-react';

import { Portal } from '@/components/portal';

import { fade, mix, slideY } from '@/lib/motion';
import { cn } from '@/helpers/styles';

import styles from './modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  lockBody?: boolean;
  on关闭: () => void;
  persist?: boolean;
  show: boolean;
  wide?: boolean;
}

const TRANSITION_DURATION = 300;

export function Modal({
  children,
  lockBody = true,
  on关闭,
  persist = false,
  show,
  wide,
}: ModalProps) {
  const variants = {
    modal: mix(fade(), slideY(20)),
    overlay: fade(),
  };

  useEffect(() => {
    if (show && lockBody) {
      document.body.style.overflowY = 'hidden';
    } else if (lockBody) {
      // Wait for transition to finish before allowing scrollbar to return
      setTimeout(() => {
        document.body.style.overflowY = 'auto';
      }, TRANSITION_DURATION);
    }
  }, [show, lockBody]);

  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      if (show && e.key === 'Escape') {
        on关闭();
      }
    }

    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  }, [on关闭, show]);

  const animationProps = persist
    ? {
        animate: show ? 'show' : 'hidden',
      }
    : {
        animate: 'show',
        exit: 'hidden',
        initial: 'hidden',
      };

  const content = (
    <专注Trap active={show}>
      <div>
        <motion.div
          {...animationProps}
          class名称={styles.overlay}
          transition={{ duration: TRANSITION_DURATION / 1000 }}
          variants={variants.overlay}
          onClick={on关闭}
          onKeyDown={on关闭}
        />
        <div class名称={styles.modal}>
          <motion.div
            {...animationProps}
            class名称={cn(styles.content, wide && styles.wide)}
            transition={{ duration: TRANSITION_DURATION / 1000 }}
            variants={variants.modal}
          >
            <button class名称={styles.close} onClick={on关闭}>
              <Io关闭 />
            </button>
            {children}
          </motion.div>
        </div>
      </div>
    </专注Trap>
  );

  return (
    <Portal>
      {persist ? (
        <div style={{ display: show ? 'block' : 'none' }}>{content}</div>
      ) : (
        <AnimatePresence>{show && content}</AnimatePresence>
      )}
    </Portal>
  );
}
