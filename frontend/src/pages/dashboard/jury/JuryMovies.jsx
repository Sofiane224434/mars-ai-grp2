import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import useApi from '../../../hooks/useApi.js';
import MovieCard from "../../../components/ui/MovieCard.jsx";
import Filter from "../../../components/ui/Filter.jsx";
import Button from "../../../components/ui/Button.jsx";
import Spinner from "../../../components/ui/Spinner.jsx";
import ToggleSwitch from "../../../components/ui/ToggleSwitch.jsx";
import Pagination from '../../../components/ui/Pagination.jsx';
import useFestivalPhase from '../../../hooks/useFestivalPhase.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const ALLOWED_STATUSES = ['approved', 'review', 'rejected', 'pending', 'top50', 'top5'];

function JuryMovies() {
  const { currentPhase } = useFestivalPhase();
  const isJudgmentPhase = currentPhase === 1;
  const isTop5Phase = currentPhase === 2;
  const isResultsPhase = currentPhase === 3;
  const allowedStatusesForPhase = useMemo(() =>
    isTop5Phase
      ? ['pending', 'top5']
      : isJudgmentPhase
        ? ['pending', 'top50']
        : ALLOWED_STATUSES,
    [isJudgmentPhase, isTop5Phase]
  );

  const normalizeStatusForPhase = (movie) => {
    const statusMap = { 1: 'pending', 2: 'rejected', 3: 'review', 4: 'approved', 5: 'top50', 6: 'top5' };
    const rawStatus = statusMap[movie.statusId] || String(movie.status || 'pending').toLowerCase();

    if (isJudgmentPhase && rawStatus === 'approved') {
      return 'pending';
    }

    if (isTop5Phase && rawStatus === 'top50') {
      return 'pending';
    }

    return ['en attente', 'wait'].includes(rawStatus) ? 'pending' : rawStatus;
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. États pour l'UI (Filtres et Mode d'affichage)
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // 2. État pour la Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6; // Changé à 6 pour mieux coller à une grille de 2 ou 3 colonnes

  // 3. Hook d'API pour récupérer les films
  const { data: rawData, isLoading, error: apiError, execute: fetchMovies } = useApi();
  const movies = useMemo(() => {
    const payload = rawData?.data || rawData;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.movies)) return payload.movies;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
  }, [rawData]);

  const selectedStatuses = useMemo(() => {
    const statusFromQuery = searchParams.get('status');
    return statusFromQuery
      ? statusFromQuery
        .split(',')
        .map((status) => status.trim())
        .filter((status) => allowedStatusesForPhase.includes(status))
      : [];
  }, [allowedStatusesForPhase, searchParams]);

  useEffect(() => {
    if (!searchParams.get('status')) {
      return;
    }

    const nextStatuses = selectedStatuses.filter((status) => allowedStatusesForPhase.includes(status));
    if (nextStatuses.length === selectedStatuses.length) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    if (nextStatuses.length > 0) {
      nextParams.set('status', nextStatuses.join(','));
    } else {
      nextParams.delete('status');
    }
    setSearchParams(nextParams, { replace: true });
  }, [allowedStatusesForPhase, searchParams, selectedStatuses, setSearchParams]);

  // --- CHARGEMENT DES DONNÉES ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }

    fetchMovies(() =>
      axios.get(`${API_BASE_URL}/jury/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-festival-phase-index': String(currentPhase),
        },
        withCredentials: true,
      })
    ).catch((err) => {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        navigate('/auth');
      }
    });
  }, [currentPhase, fetchMovies, navigate]);

  // --- GESTION DES FILTRES ---
  const handleFilterChange = (filterValue, isChecked) => {
    const current = selectedStatuses;
    const nextValues = isChecked
      ? [...current, filterValue]
      : current.filter((value) => value !== filterValue);

    const nextParams = new URLSearchParams(searchParams);
    if (nextValues.length > 0) {
      nextParams.set('status', nextValues.join(','));
    } else {
      nextParams.delete('status');
    }
    setSearchParams(nextParams, { replace: true });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('status');
    setSearchParams(nextParams, { replace: true });
    setCurrentPage(1);
  };

  // --- FILTRAGE ET PAGINATION ---
  const getFilteredMovies = () => {
    if (!movies || movies.length === 0) return [];

    return movies.filter(movie => {
      if (selectedStatuses.length > 0) {
        const normalizedMovieStatus = normalizeStatusForPhase(movie);
        if (!selectedStatuses.includes(normalizedMovieStatus)) {
          return false;
        }
      }
      return true;
    });
  };

  const filteredMovies = getFilteredMovies();
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMoviesToDisplay = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // --- RENDU ---
  if (isLoading) {
    return <div className="min-h-screen bg-linear-to-b from-noir-bleute to-gris-anthracite flex items-center justify-center"><Spinner fullScreen={true} /></div>;
  }

  const finalError = apiError;
  if (finalError) {
    return <div className="min-h-screen bg-linear-to-b from-noir-bleute to-gris-anthracite flex items-center justify-center text-center text-red-500 p-4">{finalError}</div>;
  }

  if (isResultsPhase) {
    return (
      <div className="min-h-screen bg-linear-to-b from-noir-bleute to-gris-anthracite flex items-center justify-center p-8">
        <div className="max-w-lg w-full text-center rounded-2xl border border-white/10 bg-gris-steelix/60 p-10 backdrop-blur-sm">
          <div className="mb-6 flex justify-center">
            <span className="text-6xl">🏆</span>
          </div>
          <h2 className="text-3xl font-bold font-title text-white mb-4">
            Mission accomplie&nbsp;!
          </h2>
          <p className="text-gris-magneti text-lg leading-relaxed">
            Il n&rsquo;y a plus de films à juger.<br />
            Merci, vous avez fait du bon travail&nbsp;!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-noir-bleute to-gris-anthracite pt-12 lg:pt-8 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* EN-TÊTE ET TOGGLE */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between text-center sm:text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-title text-white mb-2">
              Mes films à évaluer
            </h1>
            <p className="text-gris-magneti">
              {isTop5Phase
                ? 'Sélectionnez vos 5 films favoris parmi le Top 50.'
                : isJudgmentPhase
                  ? 'Retrouvez ici les films validés et les films du Top 50 pour le jugement final.'
                  : 'Retrouvez ici la liste des films qui vous ont été assignés.'}
            </p>
          </div>
          <div className="sm:shrink-0 sm:pt-1 flex justify-center">
            <ToggleSwitch
              isListMode={viewMode === 'list'}
              onToggle={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
            />
          </div>
        </div>

        {/* SECTION FILTRES (Simplifiée pour le Jury) */}
        <div className="mb-6">
          <div className="mb-2">
            <button
              type="button"
              onClick={() => setFiltersOpen((prev) => !prev)}
              className="flex items-center justify-center sm:justify-start gap-2 rounded-lg border border-white/20 bg-gris-steelix px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gris-magneti w-full sm:w-auto"
            >
              <span>Filtres par statut</span>
              <svg className={`h-4 w-4 transition-transform duration-200 ${filtersOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${filtersOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="rounded-lg border border-white/10 bg-gris-steelix px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <Filter variant="pending" checked={selectedStatuses.includes('pending')} onChange={(c) => handleFilterChange('pending', c)}>
                  En attente
                </Filter>
                {!isJudgmentPhase && !isTop5Phase && (
                  <Filter variant="approved" checked={selectedStatuses.includes('approved')} onChange={(c) => handleFilterChange('approved', c)}>
                    Validé
                  </Filter>
                )}
                {!isTop5Phase && (
                  <Filter variant="top50" checked={selectedStatuses.includes('top50')} onChange={(c) => handleFilterChange('top50', c)}>
                    Top 50
                  </Filter>
                )}
                {isTop5Phase && (
                  <Filter variant="top5" checked={selectedStatuses.includes('top5')} onChange={(c) => handleFilterChange('top5', c)}>
                    Top 5
                  </Filter>
                )}
                {!isJudgmentPhase && !isTop5Phase && (
                  <Filter variant="review" checked={selectedStatuses.includes('review')} onChange={(c) => handleFilterChange('review', c)}>
                    À revoir
                  </Filter>
                )}
                {!isJudgmentPhase && !isTop5Phase && (
                  <Filter variant="rejected" checked={selectedStatuses.includes('rejected')} onChange={(c) => handleFilterChange('rejected', c)}>
                    Refusé
                  </Filter>
                )}
              </div>
              <Button interactive className="shrink-0 self-center text-sm" variant="filled-yellow" onClick={handleClearFilters}>
                Supprimer les filtres
              </Button>
            </div>
          </div>
        </div>

        {/* AFFICHAGE DES FILMS (Grille ou Liste) */}
        <div className={
          viewMode === 'grid'
            ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center lg:justify-items-stretch pb-8"
            : "flex flex-col gap-4 max-w-4xl mx-auto pb-8 w-full"
        }>
          {currentMoviesToDisplay.length > 0 ? (
            currentMoviesToDisplay.map((movie) => {
              const statusStr = normalizeStatusForPhase(movie);

              // En phase de jugement ou top5, tous les films sont à évaluer.
              const cardVariant = (isJudgmentPhase || isTop5Phase) ? 'jury-pending' : (statusStr === 'pending' ? 'jury-pending' : 'jury-reviewed');

              return (
                <MovieCard
                  key={movie.id}
                  layout={viewMode}
                  variant={cardVariant}
                  status={statusStr}
                  title={movie.title}
                  directorName={movie.directorName}
                  description={movie.description || 'Description non renseignée.'}
                  thumbnailSrc={movie.thumbnail || movie.screenshotLink}
                  onMoreInfo={() => navigate(`/dashboard/jury/${id}/movies/${movie.id}`)}
                />
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400 text-lg">
              {movies.length === 0 ? (isTop5Phase ? "Aucun film disponible pour la sélection du Top 5." : isJudgmentPhase ? "Aucun film disponible pour la phase de jugement." : "Aucun film ne vous a encore été assigné.") : "Aucun film ne correspond à vos filtres."}
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {!isLoading && filteredMovies.length > ITEMS_PER_PAGE && (
          <div className="mt-4 pb-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                setCurrentPage(newPage);
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Optionnel : remonte en haut de page
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default JuryMovies;