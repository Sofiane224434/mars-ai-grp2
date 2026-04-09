import React, { useState, useEffect } from 'react';
import useApi from '../../../hooks/useApi.js';
import Spinner from '../../../components/ui/Spinner.jsx';
import Pagination from '../../../components/ui/Pagination.jsx';
import Filter from '../../../components/ui/Filter.jsx';
import Button from '../../../components/ui/Button.jsx';

// 🚀 Imports de nos nouveaux composants et du Mock
import MovieAdminCard from '../../../components/sections/DashboardAdmin/MovieAdminCard.jsx';
import EmailTemplateModal from '../../../components/sections/DashboardAdmin/EmailTemplateModal.jsx';
// 🚀 AJOUT 1 : Import de l'interrupteur
import ToggleSwitch from '../../../components/ui/ToggleSwitch.jsx';

const AdminEmailConfirmation = () => {
  const { data: movies, isLoading, error, execute: fetchMovies } = useApi();
  const [emailModal, setEmailModal] = useState({ isOpen: false, movie: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // 🚀 AJOUT 2 : La mémoire pour l'interrupteur (par défaut en mode liste pour des emails, c'est souvent plus lisible)
  const [viewMode, setViewMode] = useState('list'); 
  
  // État des filtres
  const [selectedFilters, setSelectedFilters] = useState({
    assignation: [],
    status: [],
  });

  const ITEMS_PER_PAGE = 18;
  const reviewedMovies = Array.isArray(movies) ? movies : [];
  
  // Handlers pour les filtres
  const handleFilterChange = (filterType, filterValue, isChecked) => {
    setSelectedFilters(prev => {
      const current = prev[filterType] || [];
      return {
        ...prev,
        [filterType]: isChecked
          ? [...current, filterValue]
          : current.filter(f => f !== filterValue)
      };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      assignation: [],
      status: [],
    });
  };

  // Filtrage des films
  const getFilteredMovies = () => {
    if (!reviewedMovies || reviewedMovies.length === 0) return [];
    
    return reviewedMovies.filter(movie => {
      // Filtre assignation
      if (selectedFilters.assignation.length > 0) {
        const hasJury = movie.assignedJuries && movie.assignedJuries.length > 0;
        const isAssigned = selectedFilters.assignation.includes('assigned');
        const isNotAssigned = selectedFilters.assignation.includes('unassigned');
        
        if (isAssigned && !hasJury) return false;
        if (isNotAssigned && hasJury) return false;
      }
      
      // Filtre status
      if (selectedFilters.status.length > 0) {
        const statusMap = { 1: 'pending', 2: 'rejected', 3: 'review', 4: 'approved' };
        const movieStatus = statusMap[movie.statusId] || 'pending';
        if (!selectedFilters.status.includes(movieStatus)) return false;
      }
      
      return true;
    });
  };

  const filteredMovies = getFilteredMovies();
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const currentMovies = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
    <div className="min-h-screen background-gradient-black px-4 pb-4 pt-20 sm:pt-4 md:px-8 md:pb-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-title text-white mb-2">
              Confirmations des emails
            </h1>
            <p className="text-gris-magneti">
              Liste des films évalués par le jury en attente d'une communication officielle.
            </p>
          </div>
          <div className="sm:shrink-0">
            <ToggleSwitch 
              isListMode={viewMode === 'list'} 
              onToggle={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')} 
            />
          </div>
        </div>

        {/* Barre toggle des filtres */}
        <div className="mb-6 px-4 sm:px-10">
          <button
            type="button"
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg border border-white/20 bg-gris-steelix px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gris-magneti"
          >
            <span>Filtres</span>
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${filtersOpen ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Panneau déroulant des filtres */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              filtersOpen ? "max-h-112 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-2 rounded-lg border border-white/10 bg-gris-steelix px-4 py-3">
              {/* Mobile / tablette */}
              <div className="lg:hidden">
                <div className="mx-auto w-fit flex flex-col gap-2">
                  <div className="flex flex-wrap justify-center gap-2">
                    <Filter 
                      variant="assignation"
                      checked={selectedFilters.assignation.includes('unassigned')}
                      onChange={(isChecked) => handleFilterChange('assignation', 'unassigned', isChecked)}
                    >
                      Non assigné
                    </Filter>
                    <Filter 
                      variant="assignation"
                      checked={selectedFilters.assignation.includes('assigned')}
                      onChange={(isChecked) => handleFilterChange('assignation', 'assigned', isChecked)}
                    >
                      Assigné
                    </Filter>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Filter 
                      variant="approved"
                      checked={selectedFilters.status.includes('approved')}
                      onChange={(isChecked) => handleFilterChange('status', 'approved', isChecked)}
                    >
                      Validé
                    </Filter>
                    <Filter 
                      variant="rejected"
                      checked={selectedFilters.status.includes('rejected')}
                      onChange={(isChecked) => handleFilterChange('status', 'rejected', isChecked)}
                    >
                      Refusé
                    </Filter>
                    <Filter 
                      variant="review"
                      checked={selectedFilters.status.includes('review')}
                      onChange={(isChecked) => handleFilterChange('status', 'review', isChecked)}
                    >
                      À revoir
                    </Filter>
                    <Filter 
                      variant="pending"
                      checked={selectedFilters.status.includes('pending')}
                      onChange={(isChecked) => handleFilterChange('status', 'pending', isChecked)}
                    >
                      En attente
                    </Filter>
                  </div>

                  <div className="pt-1">
                    <Button
                      interactive
                      className="w-full flex items-center justify-center text-center text-sm"
                      variant="filled-yellow"
                      onClick={handleClearFilters}
                    >
                      Supprimer les filtres
                    </Button>
                  </div>
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden lg:flex items-center justify-between gap-3">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Filter 
                      variant="assignation"
                      checked={selectedFilters.assignation.includes('unassigned')}
                      onChange={(isChecked) => handleFilterChange('assignation', 'unassigned', isChecked)}
                    >
                      Non assigné
                    </Filter>
                    <Filter 
                      variant="assignation"
                      checked={selectedFilters.assignation.includes('assigned')}
                      onChange={(isChecked) => handleFilterChange('assignation', 'assigned', isChecked)}
                    >
                      Assigné
                    </Filter>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Filter 
                      variant="approved"
                      checked={selectedFilters.status.includes('approved')}
                      onChange={(isChecked) => handleFilterChange('status', 'approved', isChecked)}
                    >
                      Validé
                    </Filter>
                    <Filter 
                      variant="rejected"
                      checked={selectedFilters.status.includes('rejected')}
                      onChange={(isChecked) => handleFilterChange('status', 'rejected', isChecked)}
                    >
                      Refusé
                    </Filter>
                    <Filter 
                      variant="review"
                      checked={selectedFilters.status.includes('review')}
                      onChange={(isChecked) => handleFilterChange('status', 'review', isChecked)}
                    >
                      À revoir
                    </Filter>
                    <Filter 
                      variant="pending"
                      checked={selectedFilters.status.includes('pending')}
                      onChange={(isChecked) => handleFilterChange('status', 'pending', isChecked)}
                    >
                      En attente
                    </Filter>
                  </div>
                </div>
                <Button
                  interactive
                  className="shrink-0 self-center flex items-center justify-center text-center text-sm"
                  variant="filled-yellow"
                  onClick={handleClearFilters}
                >
                  Supprimer les filtres
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 🚀 AJOUT 4 : Le conteneur dynamique qui change de forme selon viewMode */}
        {currentMovies.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10"
              : "flex flex-col gap-4 px-4 sm:px-10"
          }>
            {currentMovies.map((movie) => (
              <MovieAdminCard 
                key={movie.id} 
                movie={movie}
                layout={viewMode} // 🚀 AJOUT 5 : On transmet la disposition à la carte !
                onOpenEmailModal={handleOpenEmailModal} 
              />
            ))}
          </div>
        ) : (
          <div className="text-gris-magneti text-center py-20">
            {reviewedMovies.length === 0 ? "Aucun film en attente." : "Aucun film correspondant aux filtres appliqués."}
          </div>
        )}

        {!isLoading && !error && filteredMovies.length > 0 && (
          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

      </div>

      {/* La Modale isolée */}
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