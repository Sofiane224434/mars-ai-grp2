import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Plus de useState ici ! On utilise directement les props (currentPage, totalPages).

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Navigation des pages" className="mt-8 mb-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 items-center justify-center rounded-lg bg-gris-anthracite px-4 font-bold text-white transition-colors hover:bg-gris-magneti disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gris-anthracite"
      >
        Précédent
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold transition-colors ${
                isActive
                  ? 'bg-[#fde047] text-black shadow-md pointer-events-none'
                  : 'bg-gris-anthracite text-white hover:bg-gris-magneti'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 items-center justify-center rounded-lg bg-gris-anthracite px-4 font-bold text-white transition-colors hover:bg-gris-magneti disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gris-anthracite"
      >
        Suivant
      </button>
    </nav>
  );
};

export default Pagination;