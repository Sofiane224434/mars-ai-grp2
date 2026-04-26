import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function scrollToHash(hash) {
  const id = decodeURIComponent(hash.replace('#', ''));
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If a hash anchor exists and the element is present, prioritize that navigation.
    if (hash) {
      const hasScrolledToHash = scrollToHash(hash);
      if (hasScrolledToHash) return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search, hash]);

  return null;
}
