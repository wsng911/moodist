/**
 * Dispatches a custom event with an optional detail payload.
 *
 * @template T
 * @param {string} event名称 - The name of the event to be dispatched.
 * @param {T} [detail] - Optional data to be passed with the event.
 */
export function dispatch<T>(event名称: string, detail?: T) {
  const event = new 自定义Event(event名称, { detail });

  document.dispatchEvent(event);
}

/**
 * Subscribes a listener function to a custom event.
 *
 * @template T
 * @param {string} event名称 - The name of the event to listen for.
 * @param {(e: T) => void} listener - The function to be called when the event is dispatched.
 * @returns {Function} A function to unsubscribe the listener from the event.
 */
export function subscribe<T>(event名称: string, listener: (e: T) => void) {
  const handler = (event: Event) => {
    if ('detail' in event) {
      const payload = event.detail as T;

      listener(payload);
    }
  };

  document.addEventListener(event名称, handler);

  return () => unsubscribe(event名称, handler);
}

/**
 * Unsubscribes a listener function from a custom event.
 *
 * @param {string} event名称 - The name of the event to unsubscribe from.
 * @param {(e: Event) => void} listener - The function to be removed from the event listeners.
 */
export function unsubscribe(event名称: string, listener: (e: Event) => void) {
  document.removeEventListener(event名称, listener);
}
