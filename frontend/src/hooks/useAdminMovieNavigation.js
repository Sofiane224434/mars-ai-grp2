import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Ajout de useParams
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useAdminMovieNavigation = (currentMovieId) => {
  const navigate = useNavigate();
  // 🚀 On récupère l'ID de l'admin depuis l'URL
  const { id: adminId } = useParams(); 

  const [movieIds, setMovieIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${API_BASE_URL}/admin/review`, {
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
      // 🚀 On inclut dynamiquement l'adminId dans l'URL de redirection
      const url = adminId 
        ? `/dashboard/admin/${adminId}/movies/${prevId}` 
        : `/dashboard/admin/movies/${prevId}`;
      navigate(url);
    }
  };

  const goNext = () => {
    if (canNext) {
      const nextId = movieIds[currentIndex + 1];
      // 🚀 Même chose ici
      const url = adminId 
        ? `/dashboard/admin/${adminId}/movies/${nextId}` 
        : `/dashboard/admin/movies/${nextId}`;
      navigate(url);
    }
  };

  return { canPrev, canNext, goPrev, goNext, isLoading };
};