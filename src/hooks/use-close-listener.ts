import { useEffect } from 'react';

import { on关闭Modals } from '@/lib/modal';

/**
 * A custom React hook that registers a listener function to be called when modals are to be closed.
 *
 * @param {Function} listener - The function to be called when modals are to be closed.
 */
export function use关闭Listener(listener: () => void) {
  useEffect(() => {
    const unsubscribe = on关闭Modals(listener);

    return unsubscribe;
  }, [listener]);
}
