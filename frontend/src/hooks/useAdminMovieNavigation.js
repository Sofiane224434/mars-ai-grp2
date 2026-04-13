import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useAdminMovieNavigation = (currentMovieId) => {
  const navigate = useNavigate();

  const [movieIds, setMovieIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${API_BASE_URL}/admin/movies/review`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          withCredentials: true
        });

        const payload = response.data;
        const normalizedMovies = Array.isArray(payload) ? payload : payload?.movies || payload?.data || [];

        const ids = normalizedMovies
          .map((movie) => Number(movie?.id))
          .filter((id) => Number.isInteger(id) && id > 0)
          .reverse();

        setMovieIds(ids);
      } catch (error) {
        console.error("Erreur navigation admin:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMovies();
  }, []); 

  const currentId = parseInt(currentMovieId, 10);
  const currentIndex = movieIds.indexOf(currentId);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex !== -1 && currentIndex < movieIds.length - 1;

  const goPrev = () => {
    if (canPrev) {
      const prevId = movieIds[currentIndex - 1];
      navigate(`/dashboard/admin/movies/${prevId}`);
    }
  };

  const goNext = () => {
    if (canNext) {
      const nextId = movieIds[currentIndex + 1];
      navigate(`/dashboard/admin/movies/${nextId}`);
    }
  };

  return { canPrev, canNext, goPrev, goNext, isLoading };
};