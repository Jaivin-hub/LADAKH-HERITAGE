import { useEffect } from 'react';

export default function usePageNavigation(location, isProductsPage) {
  useEffect(() => {
    document.title = location.pathname.startsWith('/admin')
      ? 'Admin — Ladakh Heritage'
      : isProductsPage
        ? 'Products — Ladakh Heritage'
        : 'Ladakh Heritage — Treasures with a Story';
  }, [isProductsPage, location.pathname]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = location.hash && document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);
}
