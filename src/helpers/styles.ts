type class名称 = undefined | null | false | string;

/**
 * Combines multiple class names into a single string, filtering out invalid values.
 *
 * @param {...(undefined|null|false|string)} class名称s - The class names to be combined.
 * @returns {string} A single string containing all valid class names separated by spaces.
 */
export function cn(...class名称s: Array<class名称>): string {
  const class名称 = class名称s.filter(class名称 => !!class名称).join(' ');

  return class名称;
}
