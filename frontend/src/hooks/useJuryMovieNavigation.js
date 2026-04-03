import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useJuryMovieNavigation = (currentMovieId) => {
  const navigate = useNavigate();
  // On récupère l'ID du jury depuis l'URL (si ta route est /dashboard/jury/:id/movies/:movieId)
  // S'il n'y a pas d'ID jury dans l'URL, tu peux le retirer.
  const { id: juryId } = useParams();

  const [movieIds, setMovieIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [navigationError, setNavigationError] = useState(null);

  useEffect(() => {
    // Fallback API pour reconstruire le contexte de navigation
    const fetchAssignedMovies = async () => {
      try {
        setIsLoading(true);
        setNavigationError(null);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/jury/movies`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          withCredentials: true
        });

        const payload = response.data;
        const normalizedMovies = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.movies)
            ? payload.movies
            : Array.isArray(payload?.data)
              ? payload.data
              : null;

        if (!normalizedMovies) {
          throw new Error('Format de reponse API invalide');
        }

        // On extrait uniquement un tableau d'IDs [1, 5, 12, 45]
        const ids = normalizedMovies
          .map((movie) => Number(movie?.id))
          .filter((id) => Number.isInteger(id) && id > 0)
          .reverse();

        setMovieIds(ids);
      } catch (error) {
        console.error("Erreur lors de la récupération du contexte de navigation", error);
        setNavigationError("Impossible de charger la navigation.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignedMovies();
  }, []); // Exécuté une seule fois au montage

  // Calcul des index (en s'assurant de comparer des nombres)
  const currentId = parseInt(currentMovieId, 10);
  const currentIndex = movieIds.indexOf(currentId);

  // Logique des cas limites (premier, dernier, non assigné)
  const canPrev = currentIndex > 0;
  const canNext = currentIndex !== -1 && currentIndex < movieIds.length - 1;

  const goPrev = () => {
    if (canPrev) {
      const prevId = movieIds[currentIndex - 1];
      // Si ta route n'inclut pas le juryId, adapte simplement l'URL : `/dashboard/jury/movies/${prevId}`
      const url = juryId ? `/dashboard/jury/${juryId}/movies/${prevId}` : `/dashboard/jury/movies/${prevId}`;
      navigate(url);
    }
  };

  const goNext = () => {
    if (canNext) {
      const nextId = movieIds[currentIndex + 1];
      const url = juryId ? `/dashboard/jury/${juryId}/movies/${nextId}` : `/dashboard/jury/movies/${nextId}`;
      navigate(url);
    }
  };

  return { canPrev, canNext, goPrev, goNext, isLoading, navigationError };
};