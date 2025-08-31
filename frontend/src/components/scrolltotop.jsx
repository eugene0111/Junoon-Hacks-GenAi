import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will automatically scroll the window to the top
// on every route change.
const ScrollToTop = () => {
  // Extracts the pathname from the current location object.
  const { pathname } = useLocation();

  // The useEffect hook will run every time the pathname changes.
  useEffect(() => {
    // This command scrolls the window to the top left corner.
    window.scrollTo(0, 0);
  }, [pathname]); // The effect depends on the pathname.

  // This component doesn't render anything to the screen.
  return null;
};

export default ScrollToTop;