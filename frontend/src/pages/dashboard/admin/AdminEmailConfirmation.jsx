import React, { useState, useEffect } from 'react';
import useApi from '../../../hooks/useApi.js';
import Spinner from '../../../components/ui/Spinner.jsx';
import Pagination from '../../../components/ui/Pagination.jsx';

// 🚀 Imports de nos nouveaux composants et du Mock
import MovieAdminCard from '../../../components/sections/DashboardAdmin/MovieAdminCard.jsx';
import EmailTemplateModal from '../../../components/sections/DashboardAdmin/EmailTemplateModal.jsx';

const AdminEmailConfirmation = () => {
  const { data: movies, isLoading, error, execute: fetchMovies } = useApi();
  const [emailModal, setEmailModal] = useState({ isOpen: false, movie: null });
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 18;
  const reviewedMovies = Array.isArray(movies) ? movies : [];
  const totalPages = Math.ceil(reviewedMovies.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const currentMovies = reviewedMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const apiCall = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/review', {
        method: 'GET',
        credentials: 'include',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const raw = await response.text();
      let payload = {};
      if (raw) {
        try {
          payload = JSON.parse(raw);
        } catch {
          payload = { message: raw };
        }
      }

      if (!response.ok) {
        throw new Error(payload.message || payload.error || 'Erreur lors du chargement des films.');
      }

      return payload?.data || [];
    };

    fetchMovies(apiCall);
  }, [fetchMovies]);

  const handleOpenEmailModal = (movie) => {
    setEmailModal({ isOpen: true, movie: movie });
  };

  const handleCloseEmailModal = () => {
    setEmailModal({ isOpen: false, movie: null });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen background-gradient-black flex items-center justify-center">
        <Spinner text="Chargement de la liste des films..." fullScreen={true} />
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen text-brulure-despespoir">{error}</div>;
  }

  return (
    <div className="min-h-screen background-gradient-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold font-title text-white mb-2">
            Confirmations des emails
          </h1>
          <p className="text-gris-magneti">
            Liste des films évalués par le jury en attente d'une communication officielle.
          </p>
        </div>

        {reviewedMovies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 🚀 On boucle simplement sur notre composant isolé */}
            {currentMovies.map((movie) => (
              <MovieAdminCard 
                key={movie.id} 
                movie={movie} 
                onOpenEmailModal={handleOpenEmailModal} 
              />
            ))}
          </div>
        ) : (
          <div className="text-gris-magneti text-center py-20">Aucun film en attente.</div>
        )}

        {!isLoading && !error && reviewedMovies.length > 0 && (
          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

      </div>

      {/* 🚀 La Modale isolée */}
      {emailModal.isOpen && (
        <EmailTemplateModal 
          isOpen={emailModal.isOpen} 
          onClose={handleCloseEmailModal} 
          movie={emailModal.movie} 
        />
      )}

    </div>
  );
};

export default AdminEmailConfirmation;