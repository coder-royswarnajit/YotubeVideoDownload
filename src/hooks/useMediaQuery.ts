import { useState, useEffect } from 'react';

/**
 * Custom hook for detecting media queries
 *
 * @param {string} query - Media query string
 * @returns {boolean} Whether the media query matches
 */
function useMediaQuery(query: string): boolean {
  // State for storing whether the media query matches
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Initialize state on the client side
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    // Create handler for updating state
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener for media query
    mediaQuery.addEventListener('change', handler);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]); // Only re-run effect if query changes

  return matches;
}

// Common breakpoint helpers
export const useIsMobile = () => useMediaQuery('(max-width: 639px)');
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const useIsLargeDesktop = () => useMediaQuery('(min-width: 1280px)');
export const useIsDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');

export default useMediaQuery;