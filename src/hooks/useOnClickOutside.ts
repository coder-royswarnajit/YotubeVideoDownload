import { RefObject, useEffect } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * Custom hook for detecting clicks outside of a specified element
 *
 * @param {RefObject<HTMLElement>} ref - The ref of the element to detect clicks outside of
 * @param {Handler} handler - The handler function to run when a click outside is detected
 * @param {boolean} enabled - Whether the hook is enabled
 */
function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    // Add event listeners
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Clean up event listeners
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]); // Only re-run if ref, handler, or enabled changes
}

export default useOnClickOutside;