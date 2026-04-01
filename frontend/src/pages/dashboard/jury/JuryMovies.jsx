import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import MovieCard from '../../../components/ui/MovieCard.jsx';
import Pagination from '../../../components/ui/Pagination.jsx';
import Spinner from '../../../components/ui/Spinner.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const DEV_TEMP_TOKEN = 'token_temporaire_123';

function JuryMovies() {
  const navigate = useNavigate(); 
  const { id } = useParams(); // 
  
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5; 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('token') || DEV_TEMP_TOKEN;

        const response = await axios.get(`${API_BASE_URL}/jury/movies`, {
          // L'utilisation des headers conditionnels est très pro !
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

        setMovies(normalizedMovies);

      } catch (err) {
        console.error("Erreur lors de la récupération des films :", err);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          setError("Session invalide. Connectez-vous d'abord pour voir vos films assignés.");
        } else {
          setError(
            err?.response?.data?.message ||
            err?.message ||
            "Impossible de charger vos films. Vérifiez que l'API backend tourne sur http://localhost:5000."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []); 

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMoviesToDisplay = movies.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  const handleMoreInfo = (movieId) => {
    navigate(`/dashboard/jury/${id}/movies/${movieId}`);
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-noir-bleute to-gris-anthracite px-4 py-10">
        <h1 className="mb-8 text-center text-5xl text-white">Films Assignés au Jury</h1>

        {error && (
          <div className="mx-auto max-w-6xl mb-8 p-4 bg-red-500/10 border border-red-500 text-red-500 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          
          {isLoading ? (
            <div className="col-span-full">
              <Spinner />
            </div>
          ) : (
            currentMoviesToDisplay.map((movie) => (
              <MovieCard
                key={movie.id}
                variant={movie.status === 'wait' ? 'jury-pending' : 'jury-reviewed'}
                status={movie.status}
                title={movie.title}
                directorName={movie.directorName}
                onJudge={() => console.log("Vote rapide désactivé")} // 👈 CORRIGÉ : On évite l'erreur ReferenceError
                onMoreInfo={() => handleMoreInfo(movie.id)} // 👈 CORRIGÉ : On branche la vraie fonction !
              />
            ))
          )}

        </div>
        
        {!isLoading && !error && movies.length > 0 && (
          <div className="mt-8">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={(newPage) => setCurrentPage(newPage)}
            />
          </div>
        )}

        {!isLoading && !error && movies.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            Aucun film ne vous a encore été assigné.
          </div>
        )}
        
      </div>
    </>
  );
}

export default JuryMovies;