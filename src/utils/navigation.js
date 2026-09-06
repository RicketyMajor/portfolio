import { scroller } from 'react-scroll';

const SCROLL_OPTIONS = { duration: 500, smooth: true, offset: -80 };

// Scrolling to a section of another route has to wait for that route to paint, otherwise
// react-scroll looks for an element that React has not mounted yet.
export const navigateToSection = (navigate, currentPath, path, section) => {
  if (currentPath === path) {
    scroller.scrollTo(section, SCROLL_OPTIONS);
    return;
  }
  navigate(path);
  setTimeout(() => scroller.scrollTo(section, SCROLL_OPTIONS), 100);
};
