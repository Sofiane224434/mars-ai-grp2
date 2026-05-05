// frontend/src/hooks/usePagination.js
import { useState, useMemo } from 'react';

export const usePagination = (items = [], itemsPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Nombre total de pages à partir du nombre d'éléments disponibles.
  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  );

  // Empêche d'afficher une page invalide si la liste rétrécit.
  const safePage = useMemo(
    () => Math.min(currentPage, Math.max(totalPages, 1)),
    [currentPage, totalPages]
  );

  // Index de départ des éléments affichés sur la page courante.
  const startIndex = useMemo(
    () => (safePage - 1) * itemsPerPage,
    [safePage, itemsPerPage]
  );

  // Index de fin, utile pour slice().
  const endIndex = useMemo(
    () => startIndex + itemsPerPage,
    [startIndex, itemsPerPage]
  );

  // Sous-liste réellement affichée par le composant.
  const currentItems = useMemo(
    () => items.slice(startIndex, endIndex),
    [items, startIndex, endIndex]
  );

  return {
    currentPage: safePage,
    setCurrentPage,
    totalPages,
    currentItems,
    startIndex,
    endIndex,
  };
};

export default usePagination;