import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useApi from '../../../hooks/useApi.js';

import MovieCard from "../../../components/ui/MovieCard.jsx";
import Filter from "../../../components/ui/Filter.jsx";
import Button from "../../../components/ui/Button.jsx";
import Spinner from "../../../components/ui/Spinner.jsx";
import JuryAssignmentModal from "../../../components/sections/DashboardAdmin/JuryAssignmentModal.jsx";
// 🚀 AJOUT 1 : Import de l'interrupteur
import ToggleSwitch from "../../../components/ui/ToggleSwitch.jsx";

const ALLOWED_STATUSES = ['approved', 'review', 'rejected', 'pending'];
const ALLOWED_ASSIGNATIONS = ['assigned', 'unassigned'];

function AdminMovies() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const [filtersOpen, setFiltersOpen] = useState(false);

  // 🚀 AJOUT 2 : La mémoire pour le mode de vue (on le met en 'grid' par défaut pour cette page)
  const [viewMode, setViewMode] = useState('grid');

  // État des filtres
  const [selectedFilters, setSelectedFilters] = useState({
    assignation: [],
    status: [],
  });

  // Connexion API conservée pour afficher tes vrais films
  const { data: movies, isLoading, error, execute: fetchMovies } = useApi();
  const [juryOptions, setJuryOptions] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedJuryId, setSelectedJuryId] = useState('');
  const [assignError, setAssignError] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    const statusFromQuery = searchParams.get('status');
    const assignationFromQuery = searchParams.get('assignation');
    const parsedStatuses = statusFromQuery
      ? statusFromQuery
          .split(',')
          .map((status) => status.trim())
          .filter((status) => ALLOWED_STATUSES.includes(status))
      : [];
    const parsedAssignations = assignationFromQuery
      ? assignationFromQuery
          .split(',')
          .map((value) => value.trim())
          .filter((value) => ALLOWED_ASSIGNATIONS.includes(value))
      : [];

    setSelectedFilters((prev) => {
      const sameLength = prev.status.length === parsedStatuses.length;
      const sameValues = sameLength && prev.status.every((status, index) => status === parsedStatuses[index]);
      const sameAssignationLength = prev.assignation.length === parsedAssignations.length;
      const sameAssignationValues = sameAssignationLength && prev.assignation.every((value, index) => value === parsedAssignations[index]);

      if (sameValues && sameAssignationValues) return prev;
      return { ...prev, status: parsedStatuses, assignation: parsedAssignations };
    });

    if (parsedStatuses.length > 0 || parsedAssignations.length > 0) {
      setFiltersOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    };
  };

  const loadMovies = useCallback(async () => {
    await fetchMovies(() => axios.get(`${API_BASE_URL}/admin/movies`, getAuthConfig()));
  }, [API_BASE_URL, fetchMovies]);

  const loadJuryOptions = useCallback(async () => {
    const response = await axios.get(`${API_BASE_URL}/movies/juries`, getAuthConfig());
    const juries = response?.data?.data || [];
    setJuryOptions(Array.isArray(juries) ? juries : []);
  }, [API_BASE_URL]);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        await Promise.all([loadMovies(), loadJuryOptions()]);
      } catch (loadError) {
        console.error('Erreur de chargement admin movies/juries:', loadError);
      }
    };

    loadAdminData();
  }, [loadJuryOptions, loadMovies]);

  const openAssignModal = (movie) => {
    setSelectedMovie(movie);
    setAssignError('');

    const currentJuryId = Array.isArray(movie?.assignedJuries) && movie.assignedJuries.length > 0
      ? String(movie.assignedJuries[0]?.id || '')
      : '';

    setSelectedJuryId(currentJuryId);
    setIsAssignModalOpen(true);
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
    setSelectedMovie(null);
    setSelectedJuryId('');
    setAssignError('');
  };

  const handleAssignMovie = async () => {
    if (!selectedMovie?.id) {
      setAssignError('Film invalide.');
      return;
    }

    if (!selectedJuryId) {
      setAssignError('Sélectionne un jury.');
      return;
    }

    setIsAssigning(true);
    setAssignError('');

    try {
      await axios.post(
        `${API_BASE_URL}/movies/assign`,
        {
          movieId: Number(selectedMovie.id),
          juryId: Number(selectedJuryId),
        },
        getAuthConfig()
      );

      await Promise.all([loadMovies(), loadJuryOptions()]);
      closeAssignModal();
    } catch (requestError) {
      const zodFirstIssue = requestError?.response?.data?.erreurs?.[0]?.message;
      const message =
        requestError?.response?.data?.message ||
        requestError?.response?.data?.error ||
        zodFirstIssue ||
        'Erreur lors de l\'assignation du jury.';
      setAssignError(message);
    } finally {
      setIsAssigning(false);
    }
  };

  // Handlers pour les filtres
  const handleFilterChange = (filterType, filterValue, isChecked) => {
    setSelectedFilters(prev => {
      const current = prev[filterType] || [];
      const nextValues = isChecked
        ? [...current, filterValue]
        : current.filter(f => f !== filterValue);

      if (filterType === 'status') {
        const nextParams = new URLSearchParams(searchParams);
        if (nextValues.length > 0) {
          nextParams.set('status', nextValues.join(','));
        } else {
          nextParams.delete('status');
        }
        setSearchParams(nextParams, { replace: true });
      }

      if (filterType === 'assignation') {
        const nextParams = new URLSearchParams(searchParams);
        if (nextValues.length > 0) {
          nextParams.set('assignation', nextValues.join(','));
        } else {
          nextParams.delete('assignation');
        }
        setSearchParams(nextParams, { replace: true });
      }

      return {
        ...prev,
        [filterType]: nextValues
      };
    });
  };

  const handleClearFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('status');
    nextParams.delete('assignation');
    setSearchParams(nextParams, { replace: true });

    setSelectedFilters({
      assignation: [],
      status: [],
    });
  };

  // Filtrage des films
  const getFilteredMovies = () => {
    if (!movies || movies.length === 0) return [];

    return movies.filter(movie => {
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

  const displayMovies = getFilteredMovies();

  if (isLoading) {
    return <div className="min-h-screen background-gradient-black flex items-center justify-center"><Spinner text="Chargement des films..." fullScreen={true} /></div>;
  }

  if (error) {
    return <div className="min-h-screen background-gradient-black flex items-center justify-center text-center text-brulure-despespoir">{error}</div>;
  }

  return (
    <div className="min-h-screen background-gradient-black pt-12 lg:pt-8 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between text-center sm:text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-title text-white mb-2">
              Tous les Films
            </h1>
            <p className="text-gris-magneti">
              Liste des films du festival avec leur statut et leur assignation jury.
            </p>
          </div>
          <div className="sm:shrink-0 sm:pt-1">
            <ToggleSwitch
              isListMode={viewMode === 'list'}
              onToggle={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-2">
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
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${filtersOpen ? "max-h-112 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className="rounded-lg border border-white/10 bg-gris-steelix px-4 py-3">
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

        {/* 🚀 AJOUT 4 : Le conteneur dynamique de la grille/liste */}
        <div className={
          viewMode === 'grid'
            ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center lg:justify-items-stretch pb-12"
            : "flex flex-col gap-4 max-w-4xl mx-auto pb-12 w-full"
        }>
          {displayMovies.length > 0 ? (
            displayMovies.map((movie) => {
              const hasJury = movie.assignedJuries && movie.assignedJuries.length > 0;
              const mapStatus = { 1: 'pending', 2: 'rejected', 3: 'review', 4: 'approved' };
              const statusStr = mapStatus[movie.statusId] || 'pending';

              return (
                <MovieCard
                  key={movie.id}
                  layout={viewMode} // 🚀 AJOUT 5 : On passe la prop à ta MovieCard
                  variant={hasJury ? "admin-assigned" : "admin-assign"}
                  status={statusStr}
                  title={movie.title}
                  directorName={movie.directorName}
                  thumbnailSrc={movie.thumbnail || movie.screenshotLink}
                  assignedJurors={hasJury ? movie.assignedJuries.map(j => j.name || j.email) : []}
                  onAssign={() => openAssignModal(movie)}
                  onMoreInfo={() => navigate(`/dashboard/admin/movies/${movie.id}`)}
                />
              );
            })
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10 text-gris-magneti italic">
              Aucun film trouvé.
            </div>
          )}
        </div>
      </div>

      <JuryAssignmentModal
        isOpen={isAssignModalOpen}
        selectedMovie={selectedMovie}
        juryOptions={juryOptions}
        selectedJuryId={selectedJuryId}
        onSelectJury={setSelectedJuryId}
        assignError={assignError}
        isAssigning={isAssigning}
        onClose={closeAssignModal}
        onConfirm={handleAssignMovie}
      />
    </div>
  );
}

export default AdminMovies;